import styled, { css } from "styled-components";

interface FormTypes {
  type?: "regular" | "modal";
}

const Form = styled.form<FormTypes>`
  ${(props) =>
    props.type !== "modal" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
      max-width: 80rem;
      @media (max-width: 600px) {
        width: fit-content;
      }
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

export default Form;
