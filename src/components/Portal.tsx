import ReactDOM from "react-dom";
import { ReactNode } from "react";
const Portal = ({ children }: { children: ReactNode }) => {
  const modalElement = document.querySelector("#portal");
  return ReactDOM.createPortal(children, modalElement as Element);
};

export default Portal;
