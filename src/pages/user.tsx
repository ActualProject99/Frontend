import PickArtist from "../components/userInfo/PickArtist";
import UserInfo from "../components/userInfo/UserInfo";
const Login = () => {
  return <div>Login</div>;
};
const Signup = () => {
  return <div>Signup</div>;
};
const Mypage = () => {
  return (
    <div>
      <UserInfo />
      <PickArtist />
    </div>
  );
};
const user = {
  Login,
  Signup,
  Mypage,
};
export default user;
