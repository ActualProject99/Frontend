import { useEffect } from "react";
import { OAuthAPI } from "../../apis/query/OAuthApi";
import axios from "axios";
import { setAccessToken } from "../../apis/cookie";
import { deactivate } from "../../apis/instance";

const OAuthKakao = () => {
  const kakaoToken = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    (async () => {
      try {
        const kakaoResult = await axios.post(
          `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_FRONT}&code=${kakaoToken}`,
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        );
        if (kakaoResult.status !== 200) return;
        const token = kakaoResult.data.access_token;
        const response = await axios.post(
          `https://tgle.ml/users/oauth/kakao/callback`,

          kakaoResult.data,
          {
            headers: {
              authorization: `Bearer ${token}`,
              "Content-type": "application/x-www-from-urlencoded",
            },
          }
        );
        const {
          status,
          data: { accessToken, refreshToken, currentPage },
        } = response;
        if (status !== 302) return;
        setAccessToken(accessToken);
        localStorage.setItem("token", refreshToken);
        window.location.replace("/concerts");
        if (currentPage) {
          return window.location.replace(`/${currentPage}`);
        } else {
          return (window.location.href = "/");

          // window.location.replace("/concerts");
        }
      } catch (e) {
        console.log("에러");
        console.error(e);
        // window.location.replace("/");
      }
    })();
  }, [kakaoToken]);
  return <></>;
};

export default OAuthKakao;

// try {
//   if (kakaoToken) {
//     console.log("됨?");
//     OAuthAPI.loginWithKakao(kakaoToken);
//   }
// } catch (err) {
//   console.log("실패")
//   console.log(err)
//   // window.location.href = "/";
//   return;
// }
// }, [kakaoToken]);
// return <></>;

//es
