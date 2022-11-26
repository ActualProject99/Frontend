import LikeConcerts from "../components/userInfo/LikeConcerts";
import MyComments from "../components/userInfo/MyComments";
import PickArtist from "../components/userInfo/PickArtist";
import useTaps from "../hooks/useTaps";
import LoginCompo from "../components/login/LoginCompo";
import SignupCompo from "../components/signup/SignupCompo";
import Chatting from "../components/concertDetail/Chatting";

const Login = () => {
  return <LoginCompo />;
};
const Signup = () => {
  return <SignupCompo />;
};
const Mypage = () => {
  const { Taps, Viewer } = useTaps(
    0,
    ["좋아요 공연", <LikeConcerts />],
    ["작성한 댓글", <MyComments />],
    ["채팅 테스트", <Chatting />]
  );

  return (
    <div>
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
