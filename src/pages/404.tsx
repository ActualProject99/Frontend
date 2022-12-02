import { useNavigate } from "react-router-dom";
import icons from "../components/icons";
import { Modal } from "../components/Portal";
import { pages } from "../routes";

const NotFound = () => {
  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate(-1);
  };
  const handleClickHome = () => {
    navigate(pages.Home.path);
  };
  return (
    <Modal onClick={() => {}}>
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white w-72 h-48 shadow-lg rounded flex flex-col gap-4 justify-center">
        <div className="flex justify-center items-center gap-3">
          <icons.Warn
            className="text-red-600"
            strokeWidth={3}
            iconClassName="w-8 h-8"
          />
          <span className="text-xl font-bold">page not found</span>
        </div>
        <div className="flex gap-12 justify-center text-sm">
          <button
            onClick={handleClickBack}
            className="flex justify-center items-center gap-2"
          >
            <icons.ChevronLeft />
            back
          </button>
          <button
            onClick={handleClickHome}
            className="flex justify-center items-center gap-2"
          >
            <icons.Home />
            home
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NotFound;
