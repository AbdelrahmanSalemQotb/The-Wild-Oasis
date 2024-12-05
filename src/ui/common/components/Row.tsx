import styled, { css } from "styled-components";

interface RowProps {
  type?: "horizontal" | "vertical" | "responsive";
}

const Row = styled.div<RowProps>`
  display: flex;

  ${({ type = "vertical" }) =>
    type === "horizontal"
      ? css`
          justify-content: space-between;
          align-items: center;
        `
      : type === "responsive"
      ? css`
          justify-content: space-between;
          align-items: center;
          @media (max-width: 650px) {
            flex-direction: column;
            gap: 1.6rem;
          }
        `
      : // vertical
        css`
          flex-direction: column;
          gap: 1.6rem;
        `}
`;

export default Row;
