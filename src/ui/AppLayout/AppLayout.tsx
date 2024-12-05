import { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header/Header";
import Sidebar from "../Sidebar";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;

  grid-template-rows: auto 1fr;
  height: 100dvh;
  grid-template-areas: "sidebar header" "sidebar main";

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    grid-template-areas: "header" "main";
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: auto;
  overflow-x: hidden;
  grid-area: main;
  position: relative;

  @media (max-width: 500px) {
    padding: 2.8rem 2.8rem 4.8rem;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  @media (max-width: 500px) {
    gap: 1.8rem;
  }
`;

function AppLayout() {
  const [isSidebarHidden, setIsSidebarHidden] = useState<boolean>(true);

  function handleToggleSidebar() {
    setIsSidebarHidden((state) => !state);
  }

  return (
    <StyledAppLayout>
      <Header onToggleSidebar={handleToggleSidebar} />

      <Sidebar isHidden={isSidebarHidden} setIsHidden={setIsSidebarHidden} />

      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
