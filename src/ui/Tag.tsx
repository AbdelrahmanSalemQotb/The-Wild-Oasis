import styled from "styled-components";
import { TagColor } from "../features/Types/BookingTypes";

type TagProps = {
  type: TagColor;
};

const Tag = styled.span.withConfig({
  shouldForwardProp: (props) => props !== "type",
})<TagProps>`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
  text-align: center;
  @media (max-width: 500px) {
    font-size: 0.9rem;
    padding: 0.2rem 0.8rem;
  }

  /* Make these dynamic, based on the received prop */
  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
`;

export default Tag;
