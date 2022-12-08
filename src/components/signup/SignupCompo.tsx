import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { deactivate } from "../../apis/instance";
import { LoginForm, AfterToasted } from "../../types";
import { cls, regOptLogin } from "../../utils";
import useTicket from "../../hooks/useTicketPop";

const SignupCompo = (): JSX.Element => {
  const { Ticket, poped, userInput } = useTicket("가입을 축하드려요!🎉", {
    cacelButton: false,
    userInputs: {
      "ok 😆": true,
      no: "no",
    },
    toastOnly: true,
    type: "ckeck",
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<LoginForm>({ mode: "onChange" });
  const navigate = useNavigate();
  const password = watch("password");

  const onValid = async ({
    email,
    password,
    nickname,
    phoneNumber,
  }: LoginForm) => {
    try {
      const response = await deactivate.post("/users/signup", {
        email,
        password,
        nickname,
        phoneNumber,
      });
      if (response.status === 201) {
        poped("가입을 축하드려요!🎉", {
          afterToasted: () => {
            navigate("/user/login");
          },
        });
      } else if (response.status === 401) {
        window.alert(response.data.message);
      }
    } catch (error) {
      console.log("회원가입 에러", error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-[40rem]">
      <div className="flex flex-col justify-center items-center w-[50%] h-[32rem] gap-y-5">
        <div>
          <div className="parent w-60 h-14">
            <p className="child flex justify-center items-center text-4xl font-bold">
              회원가입
            </p>
          </div>
        </div>
        <Ticket />
        <form
          className="w-72 flex flex-col gap-1"
          onSubmit={handleSubmit(onValid)}
        >
          <div className="parent2">
            <div className="flex flex-col gap-y-1 h-16 child2">
              <label className="text-xs font-bold ">이메일 주소</label>
              <input
                type="text"
                className="h-7 border-b-2 border-x-0 border-t-0 border-gray-300 pl-1 text-xs  focus:outline-none focus:ring-transparent focus:border-b-2 focus:border-purple-700"
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
            <div className="flex flex-col  gap-y-1 h-16 child2">
              <label className="text-xs font-bold ">비밀번호</label>
              <input
                className="h-7 border-b-2 border-x-0 border-t-0 border-gray-300 pl-1 text-xs  focus:outline-none focus:ring-transparent focus:border-b-2 focus:border-purple-700"
                type="password"
                autoComplete="auto"
                placeholder="영문, 숫자, 특수문자 조합 8-16자"
                {...register(...regOptLogin.password())}
              />
              <p className="text-xs text-red-500 ">
                {errors.password?.message as string}
              </p>
            </div>
          </div>

          <div className="parent2">
            <div className="flex flex-col  gap-y-1 h-16 child2">
              <label className="text-xs font-bold ">비밀번호 확인</label>
              <input
                className="h-7 border-b-2 border-x-0 border-t-0 border-gray-300 pl-1 text-xs  focus:outline-none focus:ring-transparent focus:border-b-2 focus:border-purple-700"
                type="password"
                autoComplete="auto"
                {...register(
                  ...regOptLogin.comfirm({
                    validate: {
                      confirmPw: (v) => {
                        console.log("V", v);
                        return (
                          password === v || "비밀번호가 일치하지 않습니다!"
                        );
                      },
                    },
                  })
                )}
              />
              <p className="text-xs text-red-500 ">
                {errors.comfirm?.message as string}
              </p>
            </div>
          </div>
          <div className="parent2">
            <div className="flex flex-col  gap-y-1 h-16 child2">
              <label className="text-xs font-bold ">닉네임</label>
              <input
                type="text"
                className="h-7 border-b-2 border-x-0 border-t-0 border-gray-300 pl-1 text-xs  focus:outline-none focus:ring-transparent focus:border-b-2 focus:border-purple-700"
                autoComplete="auto"
                placeholder="한글, 숫자, 영문 3-6자"
                {...register(...regOptLogin.nickname())}
              />
              <p className="text-xs text-red-500 ">
                {errors.nickname?.message as string}
              </p>
            </div>
          </div>

          <div className="parent2">
            <div className="flex flex-col gap-y-1 h-16 child2">
              <label className="text-xs font-bold ">핸드폰번호</label>
              <input
                type="text"
                className="h-7 border-b-2 border-x-0 border-t-0 border-gray-300 pl-1 text-xs  focus:outline-none focus:ring-transparent focus:border-b-2 focus:border-purple-700"
                autoComplete="auto"
                placeholder="'-' 없이 작성해주세요"
                {...register(...regOptLogin.phoneNumber())}
              />
              <p className="text-xs text-red-500 ">
                {errors.phoneNumber?.message as string}
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
                      ? "bg-[#7151A1] border-none text-white font-bold"
                      : "bg-slate-200 border-none text-white font-bold"
                  )}
                >
                  회원가입
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
                  value="회원가입"
                />
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupCompo;
