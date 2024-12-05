import styled from "styled-components";

interface StatProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
}

const StyledStat = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1.6rem;
  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;

  @media (max-width: 400px) {
    padding: 1rem;
    grid-template-columns: 4.2rem 1fr;
  }
`;

const Icon = styled.div<{ $color: string }>`
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Make these dynamic, based on the received prop */
  background-color: ${(props) => `var(--color-${props.$color}-100)`};

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: ${(props) => `var(--color-${props.$color}-700)`};
    @media (max-width: 400px) {
      width: 2.8rem;
      height: 2.8rem;
    }
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-500);
`;

const Value = styled.p`
  font-size: 2.4rem;
  line-height: 1;
  font-weight: 500;
  @media (max-width: 400px) {
    font-size: 1.8rem;
  }
`;

function Stat({ icon, title, value, color }: StatProps) {
  return (
    <StyledStat>
      <Icon $color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  );
}

export default Stat;
