//@ts-nocheck
import { useForm } from "react-hook-form";
import { User, userState } from "../atoms/user";
import { regOptLogin } from "../utils";
import { useRecoilState } from "recoil";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const [user, setUser] = useRecoilState<User>(userState);
  const onValid = (data) => {
    setUser(() => ({ isLoggedin: true, id: 1, email: data.email }));
    console.log(user);
  };

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
  return <div>Mypage</div>;
};
const user = {
  Login,
  Signup,
  Mypage,
};
export default user;
