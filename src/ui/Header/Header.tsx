import { useMediaQuery } from "../../hooks/useMediaQuery";

import { HiMenu } from "react-icons/hi";
import styled from "styled-components";
import UserAvatar from "../../features/authentication/UserAvatar";
import ButtonIcon from "../Buttons/ButtonIcon";
import HeaderMenu from "./HeaderMenu";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  grid-area: header;
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 700px) {
    justify-content: space-between;
    padding: 1.2rem 3.6rem;
  }
  @media (max-width: 500px) {
    padding: 1.2rem 2.2rem;
  }
`;

const FlexStartDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const FlexEndDiv = styled.div`
  gap: 2.4rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

interface HeaderProps {
  onToggleSidebar: () => void;
}

function Header({ onToggleSidebar }: HeaderProps) {
  const isBelow700px = useMediaQuery("(max-width: 700px)");

  return (
    <StyledHeader>
      <FlexStartDiv>
        {isBelow700px && (
          <ButtonIcon onClick={onToggleSidebar}>
            <HiMenu />
          </ButtonIcon>
        )}
      </FlexStartDiv>

      <FlexEndDiv>
        <UserAvatar />
        <HeaderMenu />
      </FlexEndDiv>
    </StyledHeader>
  );
}
export default Header;
