import { motion, useScroll } from "framer-motion";
import { useRecoilState } from "recoil";
import { mainScrollRef } from "../atoms/mainContent";
import { useEffect, useState } from "react";
const Explore = () => {
  const [getMainScrollRef, setMainScrollRef] = useRecoilState(mainScrollRef);
  const [ref, setRef] = useState(getMainScrollRef);
  console.log("getMainScrollRef", getMainScrollRef);
  const { scrollY, scrollYProgress } = useScroll({
    container: ref,
  });

  useEffect(() => {
    const scroll = () => {
      console.log(scrollY.get(), scrollYProgress.get());
      console.log(getMainScrollRef);
    };
    getMainScrollRef?.current?.addEventListener("scroll", scroll);
    return () => {
      getMainScrollRef?.current?.removeEventListener("scroll", scroll);
    };
  }, []);
  useEffect(() => {
    setRef(getMainScrollRef);
    console.log(ref);
  }, [getMainScrollRef]);
  return (
    <motion.div
      style={{ width: scrollY }}
      className="fixed h-36 bg-rose-500"
    ></motion.div>
  );
};

export default Explore;
