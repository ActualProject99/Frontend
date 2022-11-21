import LikeConcert from "../components/userInfo/LikeConcert";
import MyComments from "../components/userInfo/MyComments";
import PickArtist from "../components/userInfo/PickArtist";
import UserInfo from "../components/userInfo/UserInfo";
import useTaps from "../hooks/useTaps";
import { useForm } from "react-hook-form";
import { User, userState } from "../atoms/user";
import { cls, regOptLogin } from "../utils";
import { useRecoilState } from "recoil";
import { LoginForm } from "../types";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({ mode: "onChange" });

  const [user, setUser] = useRecoilState<User>(userState);
  const onValid = (data: LoginForm) => {
    setUser(() => ({ isLoggedin: true, id: 1, email: data.email }));
    console.log(user);
  };
  const onInValid = () => {
    console.log("hi");
  };
  return (
    <form
      className="w-60 mx-auto flex flex-col"
      onSubmit={handleSubmit(onValid, onInValid)}
    >
      <input
        type="text"
        autoComplete="auto"
        {...register(...regOptLogin.email())}
      />
      <p>{errors.email?.message as string}</p>
      <input
        type="password"
        autoComplete="auto"
        {...register(...regOptLogin.password())}
      />
      <button className={cls(isValid ? "text-slate-800" : "text-slate-300")}>
        로그인
      </button>
      <p>로그인 되면 이메일 보임 : {user.isLoggedin && user.email}</p>
    </form>
  );
};
const Signup = () => {
  const { register, handleSubmit } = useForm();
  const onValid = console.log;
  return (
    <form
      className="w-60 mx-auto flex flex-col"
      onSubmit={handleSubmit(onValid)}
    >
      <input
        type="text"
        autoComplete="auto"
        {...register(...regOptLogin.email())}
      />
      <input
        type="password"
        autoComplete="auto"
        {...register(...regOptLogin.password())}
      />
      <button>submit</button>
    </form>
  );
};
const Mypage = () => {
  const { Taps, Viewer } = useTaps(
    ["좋아요 공연", <LikeConcert />],
    ["작성한 댓글", <MyComments />]
  );
  return (
    <div>
      <UserInfo />
      <PickArtist />
      <Taps />
      <Viewer />
    </div>
  );
};
const user = {
  Login,
  Signup,
  Mypage,
};
export default user;
