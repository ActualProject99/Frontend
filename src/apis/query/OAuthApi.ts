//@ts-nocheck
import { setAccessToken } from "../cookie";
import { activate, deactivate } from "../instance";
import axios from "axios";

export const OAuthAPI = {
  loginWithKakao: async (kakaoToken: string) => {
    await axios
      .get(`http://localhost:3000/users/kakao/callback?code=${kakaoToken}`)
      .then((data) => {
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
