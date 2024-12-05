import styled, { css } from "styled-components";

type Orientation = "horizontal" | "vertical" | "responsive";
type StyledFormRowProps = {
  $orientation: Orientation;
  $mediaWidth?: number;
};

const StyledFormRowHorizontal = css`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const StyledFormRowVertical = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;
const StyledFormRow = styled.div<StyledFormRowProps>`
  ${({ $orientation = "horizontal", $mediaWidth }) =>
    $orientation === "horizontal"
      ? StyledFormRowHorizontal
      : $orientation === "responsive"
      ? css`
          @media (max-width: ${($mediaWidth ?? 700) + 1}px) {
            & {
              ${StyledFormRowVertical}
              padding: 0.5rem 0;
            }
          }
          @media (min-width: ${$mediaWidth ?? 700}px) {
            & {
              ${StyledFormRowHorizontal}
            }
          }
        `
      : StyledFormRowVertical}
`;
const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

type IFormRow = {
  label?: string;
  error?: string;
  orientation?: Orientation;
  mediaWidth?: number;
  children: React.ReactElement;
};

function FormRow({
  label = undefined,
  error,
  orientation = "horizontal",
  mediaWidth,
  children,
}: IFormRow) {
  return (
    <StyledFormRow $orientation={orientation} $mediaWidth={mediaWidth ?? 700}>
      {label && <Label htmlFor={children?.props?.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
