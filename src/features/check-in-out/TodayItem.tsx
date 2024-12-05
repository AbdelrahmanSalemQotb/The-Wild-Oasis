import { HiOutlineCalendar } from "react-icons/hi2";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Buttons/Button";
import { Flag } from "../../ui/common/components/Flag";
import Tag from "../../ui/Tag";
import { BookingWithPartialGuest } from "../Types/BookingTypes";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 9rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  @media (max-width: 500px) {
    grid-template-columns: 5.2rem 2rem 1fr 4rem 9rem;
  }

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Nights = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.6rem;

  overflow: hidden;
  text-overflow: ellipsis;

  & > span:first-of-type {
    font-weight: 500;
    font-size: 1.6rem;
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-600);
  }

  @media (max-width: 500px) {
    & > span:last-of-type {
      display: none;
    }
  }
`;

function TodayItem({ activity }: { activity: BookingWithPartialGuest }) {
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <Flag
        src={guests?.countryFlag || "/flag-placeholder.webp"}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/flag-placeholder.webp";
        }}
        alt={`Flag of ${guests?.nationality}`}
      />
      <Guest title={guests?.fullName}>{guests?.fullName}</Guest>
      <Nights>
        <span>{numNights}</span>
        <HiOutlineCalendar />
        <span>Nights</span>
      </Nights>
      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
