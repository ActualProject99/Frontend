import { useEffect } from "react";
import { OAuthAPI } from "../../apis/query/OAuthApi";

const OAuthKakao = () => {
  const kakaoToken = new URL(window.location.href).searchParams.get("code");
  console.log("인가코드", kakaoToken);
  useEffect(() => {
    try {
      if (kakaoToken) {
        OAuthAPI.loginWithKakao(kakaoToken);
      }
    } catch (err) {
      window.location.href = "/";
      return;
    }
  }, [kakaoToken]);
  return <></>;
};

export default OAuthKakao;
