import { motion, useScroll } from "framer-motion";
import { useRecoilState } from "recoil";
import { mainScrollRef } from "../atoms/mainContent";
const Explore = () => {
  const [getMainScrollRef, setMainScrollRef] = useRecoilState(mainScrollRef);
  const { scrollY, scrollYProgress } = useScroll({
    container: getMainScrollRef,
  });
  console.log(getMainScrollRef);
  console.log(scrollY, scrollYProgress);
  return (
    <motion.div
      style={{ width: scrollY }}
      className="fixed h-36 bg-rose-500"
    ></motion.div>
  );
};

export default Explore;
