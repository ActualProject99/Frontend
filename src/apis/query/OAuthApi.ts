//@ts-nocheck
import { setAccessToken } from "../cookie";
import { activate, deactivate } from "../instance";
import axios from "axios";

export const OAuthAPI = {
  loginWithKakao: async (kakaoToken: string) => {
    console.log("여기옴?", kakaoToken);
    await deactivate
      .get(`oauth/kakao/callback?code=${kakaoToken}`) //백엔드 리다이렉트 주소로 맞추기
      .then((data) => {
        console.log("뭐주냐?", data);
        setAccessToken(data.headers.authorization);
      })
      .then((res) => {
        console.log("실패", res);
        // window.location.href = "/";
      });
  },
  //   loginWithNaver: async (naverToken: string, naverState: string) => {
  //     return await instance
  //       .get(`oauth/naver/callback?code=${naverToken}&state=${naverState}`)
  //       .then(data => {
  //         setAccessToken(data.headers.authorization);
  //       })
  //       .then(() => {
  //         window.location.href = "/";
  //       });
  //   },
};
