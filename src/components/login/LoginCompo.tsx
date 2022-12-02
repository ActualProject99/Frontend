import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { setAccessToken, getCookieToken } from "../../apis/cookie";
import { deactivate } from "../../apis/instance";
import { userState } from "../../atoms/user";
import { cls, regOptLogin } from "../../utils";
import { LoginForm, User } from "../../types";
import kakaoLogo from "../../image/kakaoLogo.png";
import useTicket from "../../hooks/useTicketPop";

const LoginCompo = (): JSX.Element => {
  const navigate = useNavigate();
  const cookie = getCookieToken();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({ mode: "onChange" });

  const [user, setUser] = useRecoilState<User>(userState);

  const { Ticket, poped, userInput } = useTicket(
    "로그인 실패..!\n아이디와 패스워드를 확인해주세요😢",
    {
      cacelButton: false,
      userInputs: {
        "ok 😆": true,
        no: "no",
      },
      toastOnly: true,
      type: "warn",
    }
  );
  const {
    Ticket: ScsTicket,
    poped: ScsPoped,
    userInput: ScsInput,
  } = useTicket("로그인 성공!", {
    cacelButton: false,
    userInputs: {
      입장하기: () => {
        navigate("/concerts");
      },
      나가기: null,
    },
    toastOnly: false,
    type: "ckeck",
  });

  const onValid = async (data: LoginForm) => {
    try {
      const response = await deactivate.post("/users/login", data);
      setAccessToken(response.data.jwt);
      const AccessToken = response.data.jwt;
      localStorage.setItem("AccessToken", AccessToken);
      ScsPoped(response.data.nickname + "님 환영합니다!🎉");

      setUser(() => ({ isLoggedin: true, id: 1, email: data.email }));
    } catch (error) {
      poped();
      console.log(error);
    }
  };
  const kakaoBtn = () => {
    const REDIRECT_URL = process.env.REACT_APP_REDIRECT_FRONT;
    console.log("리다이렉트", REDIRECT_URL);
    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;
    window.location.href = url;
  };

  useEffect(() => {
    if (cookie) {
      window.alert("이미 로그인 했어요!");
      navigate("/");
    }
  }, [navigate]);
  useEffect(() => {
    if (typeof ScsInput === "function") {
      ScsInput();
    }
  }, [ScsInput]);

  return (
    <div className="flex justify-center items-center w-full h-[35rem]">
      <div className="flex flex-col justify-center items-center w-[50%] h-[30rem]">
        <div className="flex flex-col justify-center items-center gap-1 mb-4">
          <div className="parent w-60">
            <p className="child flex flex-col justify-center items-center text-5xl font-logo font-bold">
              Tgle
            </p>
          </div>
          <div className=" parent1 w-60">
            <p className="child1 flex justify-center items-center font-bold">
              <span className="text-accent-main">T</span>
              <span>icket Jun</span>
              <span className="text-accent-main">gle</span>
            </p>
          </div>
        </div>
        <Ticket />
        <ScsTicket />

        <form
          className="w-72 flex flex-col gap-2"
          onSubmit={handleSubmit(onValid)}
        >
          <div className="parent2">
            <div className="flex flex-col gap-y-1 h-16 child2">
              <label className="text-xs font-bold ">이메일 주소</label>
              <input
                type="text"
                className="h-7 border-b-2 border-x-0 border-t-0 border-gray-300 pl-1 text-xs focus:outline-none focus:ring-transparent focus:border-b-2 focus:border-purple-700"
                autoComplete="off"
                placeholder="예) tgle@tgle.co.kr"
                {...register(...regOptLogin.email())}
              />
              <p className="text-xs text-red-500 ">
                {errors.email?.message as string}
              </p>
            </div>
          </div>
          <div className="parent2">
            <div className="flex flex-col gap-y-1 h-16 child2">
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
          </div>
          <div className="parent">
            <div className="child">
              {isValid ? (
                <button
                  className={cls(
                    "border h-10 rounded text-sm w-72",
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
                    "border h-10 rounded text-sm w-72",
                    isValid
                      ? "bg-[#7151A1] border-none text-white font-bold"
                      : "bg-slate-200 border-none text-white font-bold"
                  )}
                  value="로그인"
                />
              )}
            </div>
          </div>
        </form>
        <div className="parent">
          <div className="flex flex-col justify-center child">
            <button
              className="flex items-center justify-center w-72 h-10 bg-[#FDDC3F] rounded"
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
        </div>
        <div className="parent1">
          <div className="flex justify-center w-full text-xs font-bold gap-x-2 child1">
            <span className="text-[#707070]">
              아직 <span className="font-logo text-accent-main">Tgle</span>{" "}
              회원이 아니신가요?
            </span>
            <span
              className="text-purple-700 cursor-pointer"
              onClick={() => navigate("/user/signup")}
            >
              이메일로 회원가입
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCompo;
