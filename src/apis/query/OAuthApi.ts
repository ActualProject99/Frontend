import { setAccessToken } from "../cookie";
import { activate } from "../instance";

export const OAuthAPI = {
  loginWithKakao: async (kakaoToken: string) => {
    return await activate
      .get(`oauth/kakao/callback?code=${kakaoToken}`)
      .then((data) => {
        setAccessToken("data.headers.authorization");
      })
      .then(() => {
        window.location.href = "/";
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
