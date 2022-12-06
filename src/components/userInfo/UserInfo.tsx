import React, { useState, useCallback, ChangeEvent, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import UserApi from "../../apis/query/UserApi";
import kakaoLogo from "../../image/kakaoLogo.png";

import { LoginForm } from "../../types";
import { regOptLogin } from "../../utils";

//@ts-ignore
const UserInfo = ({ poped }): JSX.Element => {
  const { data: userData } = UserApi.GetUserInfo();
  const { mutateAsync: EditUserName } = UserApi.EditUserName();
  const { mutateAsync: EditUserImg } = UserApi.EditUserImg();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<LoginForm>({ mode: "onChange" });

  const queryClient = useQueryClient();

  const [isEdit, setIsEdit] = useState(false);
  const [editNickname, setEditNickname] = useState(userData?.nickname);
  console.log("변경닉네임", editNickname);

  // const onChangeNickname = useCallback(
  //   async (e: ChangeEvent<HTMLInputElement>) => {
  //     const { value } = e.target;
  //     setEditNickname(value);
  //   },
  //   [setEditNickname]
  // );
  const editName = watch("nickname");
  console.log("뭐야?", editName);
  const onNicknameEdit = useCallback((): void => {
    if (editName === "") {
      return poped("입력해주세요!", { newType: "info" });
    }
    if (!editName?.trim()) return;
    const payload = {
      nickname: editName,
    };

    EditUserName(payload).then(() => {
      poped();
      queryClient.invalidateQueries(["userInfo"]);
    });

    setIsEdit(false);
  }, [editName, EditUserName, queryClient]);

  const [imageSrc, setImageSrc] = useState(userData?.profileImg);
  const onChangeImg = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      setImageSrc(URL.createObjectURL(e.target.files[0]));
      const payload = {
        profileImg: e.target.files[0],
      };

      EditUserImg(payload).then(() => {
        queryClient.invalidateQueries(["userInfo"]);
        poped("프로필 사진 변경 완료!💾", { isToastOnly: true });
      });
      console.log("뭐야?");
    },
    [EditUserImg, queryClient, poped]
  );

  return (
    <div className="flex flex-col justify-center items-center w-[95%] h-full p-5 mx-auto my-5 gap-6">
      <div className="w-36 h-36 relative">
        <img
          id="uploadedimage"
          className="w-36 h-36 rounded-[50%] absolute"
          alt="userImg"
          src={imageSrc}
        />
        <label className="absolute cursor-pointer w-36 h-36 rounded-[50%]  hover:bg-[#1f1e1f16]">
          <input
            className="w-[0px] h=[0px] p-0 border-[0] overflow-hidden"
            type="file"
            onChange={onChangeImg}
          />
        </label>
      </div>
      <div className="flex flex-col items-center justify-center w-96 h-36 gap-y-4 mt-3">
        <div className="flex items-center h-11 ">
          <img className="w-7 h-7" alt="emailImg" src={kakaoLogo} />
          <span className="text-2xl ml-3 h-10 ">{userData?.email}</span>
        </div>
        <div className="flex items-center">
          {!isEdit ? (
            <div className="flex flex-col items-center gap-y-2 h-28">
              <p className="text-2xl mb-[0.5rem] mt-[-0.25rem] ">
                {userData?.nickname}
              </p>
              <button
                className="flex justify-center items-center w-28 h-10 border rounded-md"
                onClick={() => setIsEdit((prev) => !prev)}
              >
                닉네임 수정
              </button>
            </div>
          ) : (
            <form
              className="flex flex-col items-center gap-y-2 h-28"
              onSubmit={handleSubmit(onNicknameEdit)}
            >
              <input
                className="text-2xl border-x-0 border-t-0 border-b-1 border-primary-500 h-12 w-1/2 p-0 -mt-3 focus:border-purple-500 focus:ring-transparent"
                type="text"
                value={editNickname}
                autoComplete="auto"
                placeholder="한글, 숫자, 영문 3-10자"
                {...register(...regOptLogin.nickname())}
              />
              <p className="text-xs text-red-500 ">
                {errors.nickname?.message as string}
              </p>
              <button className="flex justify-center items-center w-28 h-10 border rounded-md">
                변경 완료
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
