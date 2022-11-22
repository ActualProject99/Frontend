//@ts-nocheck
import LikeConcerts from "../components/userInfo/LikeConcerts";
import MyComments from "../components/userInfo/MyComments";
import PickArtist from "../components/userInfo/PickArtist";
import UserInfo from "../components/userInfo/UserInfo";
import useTaps from "../hooks/useTaps";
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
  const { Taps, Viewer } = useTaps(
    ["좋아요 공연", <LikeConcerts />],
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
