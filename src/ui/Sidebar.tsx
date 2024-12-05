import styled from "styled-components";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useOutsideClick } from "../hooks/useOutsideClick";
import CloseButton from "./Buttons/CloseButton";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  transition: transform 0.5s ease;

  @media (max-width: 700px) {
    /* opacity: 0;
    visibility: hidden; */
    position: absolute;
    z-index: 100;
    height: 100dvh;
    left: 0;
    top: 0;
    transform: translateX(-110%);

    &.visible {
      /* visibility: visible;
      opacity: 1; */
      transform: translateX(0);
    }
  }
`;

type SidebarProps = {
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
  isHidden: boolean;
};

function Sidebar({ isHidden, setIsHidden }: SidebarProps) {
  const isBelow700px = useMediaQuery("(max-width: 700px)");

  const ref = useOutsideClick(() => setIsHidden(true));

  return (
    <StyledSidebar ref={ref} className={isHidden ? "hidden" : "visible"}>
      {isBelow700px && <CloseButton onClick={() => setIsHidden(true)} />}
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
