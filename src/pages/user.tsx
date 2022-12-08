import LikeConcerts from "../components/userInfo/LikeConcerts";
import MyComments from "../components/userInfo/MyComments";
import PickArtist from "../components/userInfo/PickArtist";
import useTaps from "../hooks/useTaps";
import LoginCompo from "../components/login/LoginCompo";
import SignupCompo from "../components/signup/SignupCompo";
import { motion } from "framer-motion";

const Login = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LoginCompo />
    </motion.div>
  );
};
const Signup = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SignupCompo />;
    </motion.div>
  );
};
const MyPick = () => {
  const { Taps, Viewer } = useTaps(
    1,
    ["좋아요 공연", <LikeConcerts />],
    ["작성한 댓글", <MyComments />]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PickArtist />
      <Taps />
      <Viewer />
    </motion.div>
  );
};
const user = {
  Login,
  Signup,
  MyPick,
};
export default user;
