import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    elRef.current.className =
      "max-w-[500px] p-4 text-center rounded-[30px] bg-[#faeff0]";
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    modalRoot.className =
      "fixed left-0 right-0 bottom-0 top-0 z-10 flex items-center justify-center bg-white empty:hidden bg-transparent";
    return () => modalRoot.removeChild(elRef.current);
  });

  return createPortal(<div className="">{children}</div>, elRef.current);
};

export default Modal;
