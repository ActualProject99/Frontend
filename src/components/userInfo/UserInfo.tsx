import React, { useState, useCallback, ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { userState, IUesrTypes } from "../../store/user";
import { useQueryClient } from "@tanstack/react-query";

import UserApi from "../../apis/query/UserApi";
import kakaoLogo from "../../image/kakaoLogo.png";
import userDefault from "../../image/userDefault.png";
import icons from "../icons";
import CloudinaryUploadWidget from "./Cloudinary";

const UserInfo = (): JSX.Element => {
  const { data: userData } = UserApi.GetUserInfo();
  const { mutateAsync: EditUserName } = UserApi.EditUserName();
  const { mutateAsync: EditUserImg } = UserApi.EditUserImg();

  const queryClient = useQueryClient();
  const [user, setUser] = useRecoilState<IUesrTypes>(userState);
  const [isEdit, setIsEdit] = useState(false);
  const [editNickname, setEditNickname] = useState(userData?.nickname);

  const onChangeNickname = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.target;
      setEditNickname(value);
      console.log("value", value);
    },
    [setEditNickname]
  );

  const onNicknameEdit = useCallback((): void => {
    if (editNickname === "") {
      return window.alert("모두 입력해주세요");
    }
    if (!editNickname?.trim()) return;
    const payload = {
      nickname: editNickname,
    };
    EditUserName(payload).then(() => {
      console.log("pay", payload);
      queryClient.invalidateQueries(["userInfo"]);
      window.alert("변경 완료!");
    });

    setIsEdit(false);
  }, [editNickname, EditUserName, queryClient]);

  // const [imageSrc, setImageSrc] = useState(userData?.userImg);
  // const onChangeImg = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     if (!e.target.files) {
  //       return;
  //     }

  //     const formData = new FormData();
  //     formData.append("image", e.target.files[0]);
  //     const payload = {
  //       userImg: imageSrc,
  //     };
  //     EditUserImg(payload).then(() => {
  //       console.log("form", payload);
  //       queryClient.invalidateQueries(["userInfo"]);
  //       window.alert("변경 완료!");
  //     });
  //   },
  //   [EditUserImg, queryClient, imageSrc]
  // );

  return (
    <div className="flex items-center w-[95%] h-52 p-5 border mx-auto my-5 gap-6">
      <div className="absolute">
        <img
          id="uploadedimage"
          className="w-36 h-36 rounded-[50%]"
          alt="userImg"
          src={userData?.userImg}
        />
      </div>
      {/* <label
        className="relative cursor-pointer w-36 h-36 rounded-[50%]  hover:bg-[#1f1e1f16]"
        htmlFor="photo"
      /> */}
      {/* <input
        id="photo"
        className="w-[0px] h=[0px] p-0 border-[0] overflow-hidden"
        type="file"
        onChange={onChangeImg}
      /> */}
      <CloudinaryUploadWidget />
      <div className="flex flex-col items-start   w-96 h-36 gap-y-4">
        <div className="flex items-center h-11 ">
          <img className="w-7 h-7" alt="emailImg" src={kakaoLogo} />
          <span className="text-2xl ml-3 h-10 ">{userData?.email}</span>
        </div>
        <div className="flex items-center  ">
          {!isEdit ? (
            <div className="flex items-center gap-x-2 h-12">
              <p className="text-3xl ">{userData?.nickname}</p>
              <icons.Pencil
                className="cursor-pointer"
                onClick={() => setIsEdit((prev) => !prev)}
              />
            </div>
          ) : (
            <div className="flex items-center gap-x-2 ">
              <input
                className="text-3xl border-x-0 border-t-0 border-b-1 border-primary-500 h-12 w-1/2 p-0 focus:outline-none"
                type="text"
                value={editNickname}
                onChange={onChangeNickname}
              />
              <icons.Done className="cursor-pointer" onClick={onNicknameEdit} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
