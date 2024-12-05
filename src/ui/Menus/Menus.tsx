import { createContext, MouseEventHandler, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../../hooks/useOutsideClick";

import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import {
  ButtonProps,
  ChildrenProp,
  ContextValue,
  IdProp,
  Position,
  StyledListTypes,
} from "./MenusTypes";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<StyledListTypes>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position?.x}px;
  top: ${(props) => props.$position?.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  text-transform: capitalize;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext<ContextValue | undefined>(undefined);

function Menus({ children }: ChildrenProp) {
  const [openId, setOpenId] = useState<string | number>("");
  const [position, setPosition] = useState<Position | null>(null);

  function open(menuId: string | number) {
    const strMenuId = menuId;
    setOpenId(strMenuId);
  }

  function close() {
    setOpenId("");
  }
  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: IdProp) {
  const contextValue = useContext(MenusContext);
  if (!contextValue) throw new Error("Toggle used outside Menus component");
  const { openId, open, close, setPosition } = contextValue;

  const handleClick: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    const rect = (e.target as HTMLElement)
      .closest("button")
      ?.getBoundingClientRect();
    if (!rect) return;

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    if (openId !== id) {
      open(id);
    } else {
      close();
    }
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
//TODO: Fix Position
function List({ id, children }: IdProp & ChildrenProp) {
  const contextValue = useContext(MenusContext);
  if (!contextValue) throw new Error("Toggle used outside Menus component");
  const { openId, position, close } = contextValue;

  const ref = useOutsideClick<HTMLUListElement>(close, false);

  if (id !== openId) return null;

  return createPortal(
    <StyledList ref={ref} $position={position}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick, disabled = false }: ButtonProps) {
  const contextValue = useContext(MenusContext);
  if (!contextValue) throw new Error("Toggle used outside Menus component");
  const { close } = contextValue;

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Toggle = Toggle;
Menus.Menu = Menu;
Menus.List = List;
Menus.Button = Button;
export default Menus;
