import { setAccessToken } from "../cookie";
import { activate, deactivate } from "../instance";

export const OAuthAPI = {
  loginWithKakao: async (kakaoToken: string) => {
    return await deactivate
      .get(`/users/kakao?code=${kakaoToken}`) //백엔드 리다이렉트 주소로 맞추기
      .then((data) => {
        console.log("토큰", data);
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
