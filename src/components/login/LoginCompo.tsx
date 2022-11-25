import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { setAccessToken, getCookieToken } from "../../apis/cookie";
import { deactivate } from "../../apis/instance";
import { User, userState } from "../../atoms/user";
import { cls, regOptLogin } from "../../utils";
import { LoginForm } from "../../types";
import kakaoLogo from "../../image/kakaoLogo.png";

const LoginCompo = (): JSX.Element => {
  const navigate = useNavigate();
  const cookie = getCookieToken();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({ mode: "onChange" });

  const [user, setUser] = useRecoilState<User>(userState);

  const onValid = async (data: LoginForm) => {
    try {
      const response = await deactivate.post("/users/login", data);
      console.log("답", response);
      setAccessToken(response.data.AccessToken);
      const AccessToken = response.data.AccessToken;
      localStorage.setItem("AccessToken", AccessToken);
      console.log("jwt", AccessToken);
      navigate("/");
      window.alert("로그인 성공");
      setUser(() => ({ isLoggedin: true, id: 1, email: data.email }));
      console.log(user);
    } catch (error) {
      window.alert("로그인 실패");
      console.log(error);
    }
  };
  const kakaoBtn = () => {
    const REDIRECT_URL = "http://" + process.env.REACT_APP_REDIRECT_FRONT;
    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;
    window.location.href = url;
  };

  useEffect(() => {
    if (cookie) {
      window.alert("이미 로그인 했어요!");
      navigate("/");
    }
  }, [navigate, cookie]);

  return (
    <div className="flex justify-center items-center w-full h-[35rem]">
      <div className="flex flex-col justify-center items-center w-[50%] h-[30rem] gap-y-5">
        <div className="w-60  flex flex-col items-center gap-4">
          <p className="text-5xl font-bold italic">Tgle</p>
          <p className="font-bold">Ticket Jungle</p>
        </div>
        <form
          className="w-72 flex flex-col gap-y-4"
          onSubmit={handleSubmit(onValid)}
        >
          <div className="flex flex-col gap-y-1 h-16">
            <label className="text-xs font-bold ">이메일 주소</label>
            <input
              type="text"
              className="h-7 border-b-2 border-x-0 border-t-0 border-gray-300 pl-1 text-xs  focus:outline-none focus:ring-transparent focus:border-b-2 focus:border-purple-700"
              autoComplete="auto"
              placeholder="예) tgle@tgle.co.kr"
              {...register(...regOptLogin.email())}
            />
            <p className="text-xs text-red-500 ">
              {errors.email?.message as string}
            </p>
          </div>
          <div className="flex flex-col  gap-y-1 h-16">
            <label className="text-xs font-bold ">비밀번호</label>
            <input
              className="h-7 border-b-2 border-x-0 border-t-0 border-gray-300 pl-1 text-xs  focus:outline-none focus:ring-transparent focus:border-b-2 focus:border-purple-700"
              type="password"
              autoComplete="auto"
              {...register(...regOptLogin.password())}
            />
            <p className="text-xs text-red-500 ">
              {errors.password?.message as string}
            </p>
          </div>
          {isValid ? (
            <button
              className={cls(
                "border h-10 rounded text-sm",
                isValid
                  ? "bg-[#7151A1] border-none text-black font-bold"
                  : "bg-slate-200 border-none text-white font-bold"
              )}
            >
              로그인
            </button>
          ) : (
            <input
              type="button"
              className={cls(
                "border h-10 rounded text-sm",
                isValid
                  ? "bg-[#7151A1] border-none text-white font-bold"
                  : "bg-slate-200 border-none text-white font-bold"
              )}
              value="로그인"
            />
          )}
        </form>
        <div className="flex flex-col justify-center">
          <button
            className="flex items-center justify-center  w-72 h-10  bg-[#FDDC3F] rounded"
            onClick={kakaoBtn}
          >
            <img
              className="w-6 h-6 ml-[-5.5rem] mr-[4.2rem]"
              alt="kakaologin"
              src={kakaoLogo}
            />
            <span className="text-sm text-[#3A2929] font-bold">
              카카오 로그인
            </span>
          </button>
        </div>
        <div className="flex justify-center w-full text-xs font-bold gap-x-2 ">
          <span className="text-[#707070]">아직 Tgle 회원이 아니신가요?</span>
          <span
            className="text-[#7151A1] cursor-pointer"
            onClick={() => navigate("/user/signup")}
          >
            이메일로 회원가입
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginCompo;
