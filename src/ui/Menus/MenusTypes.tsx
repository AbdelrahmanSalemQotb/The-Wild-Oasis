import { ReactNode } from "react";

export type IdProp = {
  id: string | number;
};
export type ChildrenProp = {
  children: ReactNode;
};
export type Position = {
  x: number;
  y: number;
};
export type StyledListTypes = {
  $position: Position | null;
};
export type ContextValue = {
  openId: string | number;
  open: (menuId: string | number) => void;
  close: () => void;
  position: Position | null;
  setPosition: ($position: Position) => void;
};
export type ButtonProps = {
  children?: ReactNode;
  icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};
