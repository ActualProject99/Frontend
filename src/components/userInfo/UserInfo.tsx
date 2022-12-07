import React, { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import UserApi from "../../apis/query/UserApi";
import kakaoLogo from "../../image/kakaoLogo.png";

import { EditNickname } from "../../types";
import { regOptEdi } from "../../utils";

//@ts-ignore
const UserInfo = ({ deletePoped }): JSX.Element => {
  const { data: userData } = UserApi.GetUserInfo();
  console.log("유데", userData);
  const { mutateAsync: EditUserName } = UserApi.EditUserName();
  const { mutateAsync: EditUserImg } = UserApi.EditUserImg();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<EditNickname>();

  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);

  const onNicknameEdit = useCallback(
    (payload: EditNickname) => {
      EditUserName(payload).then(() => {
        queryClient.invalidateQueries(["userInfo"]);
        deletePoped("닉네임이 변경되었습니다", { isToastOnly: true });
      });

      setIsEdit(false);
    },
    [EditUserName, queryClient]
  );

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
        deletePoped("프로필 사진 변경 완료!💾", { isToastOnly: true });
      });
      console.log("뭐야?");
    },
    [EditUserImg, queryClient, deletePoped]
  );

  const deleteUser = () => {
    deletePoped();
  };

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
      <div className="flex flex-col items-center justify-center w-96 h-52 gap-y-4 mt-3">
        <div className="flex items-center h-11 ">
          <img className="w-7 h-7" alt="emailImg" src={kakaoLogo} />
          <span className="text-2xl ml-3 h-10 ">{userData?.email}</span>
        </div>
        <div className="flex items-center justify-center">
          {!isEdit ? (
            <div className="flex flex-col items-center gap-y-2 h-28">
              <p className="text-2xl mb-[1rem] mt-[-0.2rem] ">
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
                className="text-2xl border-x-0 border-t-0 border-b-1 border-primary-500 h-12 w-full p-0 -mt-3 focus:border-purple-500 focus:ring-transparent"
                type="text"
                autoComplete="auto"
                defaultValue={userData?.nickname}
                placeholder="한글, 숫자, 영문 3-10자"
                {...register(...regOptEdi.editNickname())}
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
        <div className="flex justify-end w-full -mt-6 mb-3">
          <button
            className="flex justify-center items-center w-20 h-7 text-sm border rounded-md"
            onClick={deleteUser}
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
