import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { OAuthAPI } from "../../apis/query/OAuthApi";

const OAuthKakao = () => {
  const kakaoToken = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    try {
      if (kakaoToken) {
        OAuthAPI.loginWithKakao(kakaoToken);
      }
    } catch (err) {
      window.location.href = "/";
      return;
    }
  }, []);
  return <></>;
};

export default OAuthKakao;
