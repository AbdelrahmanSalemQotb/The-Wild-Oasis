import { HiOutlineFilter } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { FILTER_OPTIONS } from "../../features/bookings/bookingFilterOptions";
import { useMediaQuery } from "../../hooks/useMediaQuery"; // Import the custom hook
import Select from "../Form/FormControls/Select";
import { Options } from "../Form/FormControls/SelectTypes";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;

  @media (max-width: 1160px) {
  }
`;

interface ButtonStateProp {
  $active: boolean;
}

const FilterButton = styled.button<ButtonStateProp>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

interface FilterProps {
  filterField: string;
  options: Options;
  isSelect?: boolean;
  mediaQuery?: string;
  icon?: React.ReactNode;
}

function Filter({
  filterField,
  options,
  isSelect = false,
  mediaQuery = undefined,
  icon,
}: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFiled = searchParams.get(filterField) || options.at(0)?.value;

  const matchesMediaQuery = useMediaQuery(mediaQuery || ""); // Use the custom hook

  function handleSelect(value: string) {
    searchParams.set(filterField, value);
    searchParams.delete("page");
    setSearchParams(searchParams);
  }

  if (isSelect || matchesMediaQuery)
    return (
      <Select
        mediaQuery={mediaQuery}
        options={options}
        icon={icon ?? <HiOutlineFilter />}
        value={activeFiled ?? FILTER_OPTIONS[0].value}
        onChange={(e) => handleSelect(e.target.value)}
      />
    );

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleSelect(option.value)}
          $active={activeFiled === option.value}
          disabled={activeFiled === option.value}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
