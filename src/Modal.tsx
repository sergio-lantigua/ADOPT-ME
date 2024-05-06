import React, {
  useEffect,
  useRef,
  MutableRefObject,
  ReactElement,
} from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }: { children: ReactElement }) => {
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
    elRef.current.className =
      "max-w-[500px] p-4 text-center rounded-[30px] bg-[#faeff0]";
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (!modalRoot || !elRef.current) {
      return;
    }
    modalRoot.appendChild(elRef.current);
    modalRoot.className =
      "fixed left-0 right-0 bottom-0 top-0 z-10 flex items-center justify-center empty:hidden bg-transparent";
    return () => {
      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  });

  return createPortal(<div className="">{children}</div>, elRef.current);
};

export default Modal;
