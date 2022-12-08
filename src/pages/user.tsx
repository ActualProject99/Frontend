import LikeConcerts from "../components/userInfo/LikeConcerts";
import MyComments from "../components/userInfo/MyComments";
import PickArtist from "../components/userInfo/PickArtist";
import useTaps from "../hooks/useTaps";
import LoginCompo from "../components/login/LoginCompo";
import SignupCompo from "../components/signup/SignupCompo";

const Login = () => {
  return <LoginCompo />;
};
const Signup = () => {
  return <SignupCompo />;
};
const MyPick = () => {
  const { Taps, Viewer } = useTaps(
    1,
    ["좋아요 공연", <LikeConcerts />],
    ["작성한 댓글", <MyComments />],
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
  MyPick,
};
export default user;
