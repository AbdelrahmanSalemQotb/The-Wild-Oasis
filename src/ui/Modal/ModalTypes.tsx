import { ReactElement } from "react";

export type ModalContextType = {
  openName: string | number;
  close: () => void;
  open: (name: string | number) => void;
};
export type ModalOpenProps = {
  opens: string | number;
  children: ReactElement;
};
export type ModalWindowProps = {
  name: string | number;
  children: ReactElement;
};
