import { createPortal } from "react-dom";

const Modal = ({ onHide, icon, title, color, children }) => {
  return createPortal(
    <div className="fixed inset-0 flex-align-center md:justify-center">
      {/* modal overlay */}
      <div
        onClick={onHide}
        className="fixed inset-0 bg-modalOverlay -z-10"
      ></div>

      {/* modal content */}
      <div className="bg-white rounded-lg p-5 w-[90%] mx-auto md:w-[450px] md:mx-0">
        <span
          className={`flex justify-center text-[70px] sm:text-[80px] ${color} `}
        >
          {icon}
        </span>
        <h2 className="font-bold text-xl text-center my-4">{title}</h2>
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
