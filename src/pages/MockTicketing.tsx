import Seats from "../components/Seats";
import useMock from "../hooks/useMock";

const MockTicketing = () => {
  const { StartBtn } = useMock();
  return (
    <>
      <StartBtn />
      <Seats />
    </>
  );
};

export default MockTicketing;
