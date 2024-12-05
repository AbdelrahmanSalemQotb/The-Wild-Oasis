import {
  cloneElement,
  createContext,
  MouseEvent,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import CloseButton from "../Buttons/CloseButton";
import {
  ModalContextType,
  ModalOpenProps,
  ModalWindowProps,
} from "./ModalTypes";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  z-index: 1001;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState<string | number>("");
  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ opens, children }: ModalOpenProps) {
  const contextValue = useContext(ModalContext);
  if (!contextValue)
    throw new Error("modal must be used within a modals provider");

  const { open } = contextValue;

  if (!opens) console.error("opens string must be exist");

  function handleOpenName() {
    open(opens);
  }

  return cloneElement(children, { onClick: handleOpenName });
}

function Window({ name, children }: ModalWindowProps) {
  const contextValue = useContext(ModalContext);
  if (!contextValue)
    throw new Error("modal must be used within a modals provider");

  const { openName, close } = contextValue;

  const ref = useRef<HTMLDivElement | null>(null);

  if (!name) console.error("name string must be exist");

  if (name !== openName) return null;

  function handleClose(e: MouseEvent<HTMLDivElement>) {
    if (ref.current && e.target === ref.current) {
      close();
    }
  }

  return createPortal(
    <Overlay ref={ref} onClick={handleClose}>
      <StyledModal>
        <CloseButton onClick={close} />
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
