import styled, { css } from "styled-components";
import { StyledSelectTypes, TypeSelect } from "./SelectTypes";

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  max-width: 100%;
`;

const Label = styled.label<{ $mediaQuery?: string }>`
  position: absolute;
  top: 50%;
  right: 0.8rem;
  transform: translateY(-40%);
  pointer-events: none;
  cursor: pointer;
  ${(props) =>
    props.$mediaQuery &&
    css`
      @media ${props.$mediaQuery} {
        right: 50%;
        transform: translate(50%, -40%);
      }
    `};
`;

const StyledSelect = styled.select<StyledSelectTypes>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.$type === "white"
        ? css`var(--color-grey-100)`
        : css`var(--color-grey-300)`};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  ${(props) =>
    props.$hasIcon &&
    css`
      padding-right: 3rem;
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
    `};
  ${(props) =>
    props.$mediaQuery &&
    css`
      @media ${props.$mediaQuery} {
        width: 0;
      }
    `};
`;

function Select({
  options,
  value,
  onChange,
  icon,
  mediaQuery,
  ...props
}: TypeSelect & { mediaQuery?: string }) {
  const id = Math.random().toString(36).substring(7); // Generate a random id

  const selectElement = (
    <StyledSelect
      id={id}
      value={value}
      onChange={onChange}
      $hasIcon={!!icon}
      $mediaQuery={mediaQuery}
      {...props}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value} label={option.label} />
      ))}
    </StyledSelect>
  );

  if (!icon) return selectElement;

  return (
    <Wrapper>
      <Label $mediaQuery={mediaQuery} htmlFor={id}>
        {icon}
      </Label>
      {selectElement}
    </Wrapper>
  );
}

export default Select;
