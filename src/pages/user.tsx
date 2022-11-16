import LikeConcert from "../components/userInfo/LikeConcert";
import MyComments from "../components/userInfo/MyComments";
import PickArtist from "../components/userInfo/PickArtist";
import UserInfo from "../components/userInfo/UserInfo";
import useTaps from "../hooks/useTaps";
const Login = () => {
  return <div>Login</div>;
};
const Signup = () => {
  return <div>Signup</div>;
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
