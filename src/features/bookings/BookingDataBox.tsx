import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import styled from "styled-components";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/common/components/Flag";

import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { BookingWithCabinAndGuest } from "../Types/BookingTypes";

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    padding: 2rem 1.6rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
  svg {
    height: 3.2rem;
    width: 3.2rem;
    @media (max-width: 600px) {
      height: 2.4rem;
      width: 2.4rem;
    }
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
    @media (max-width: 600px) {
      font-size: 1.2rem;
    }
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
    @media (max-width: 600px) {
      font-size: 1.4rem;
      margin-left: 2px;
    }
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;

  @media (max-width: 600px) {
    padding: 2.8rem 2rem 1rem;
  }
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }

  @media (max-width: 600px) {
    font-size: 1rem;
  }

  @media (max-width: 400px) {
    gap: 0.6rem;
  }
`;

type PriceProps = {
  isPaid: boolean;
};

const Price = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isPaid",
})<PriceProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }

  @media (max-width: 600px) {
    padding: 1.6rem 1.8rem;

    font-size: 1.1rem;
    gap: 0.8rem;
  }
  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

// A purely presentational component
function BookingDataBox({ booking }: { booking: BookingWithCabinAndGuest }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests,
    cabins,
  } = booking;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin{" "}
            <span>&bull;{cabins?.name || "Unknown Cabin"}&bull;</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <Guest>
          {guests?.countryFlag && (
            <Flag
              src={guests.countryFlag ?? "/flag-placeholder.webp"}
              onError={(e) =>
                ((e.target as HTMLImageElement).src = "/flag-placeholder.webp")
              }
              alt={`Flag of ${guests.nationality}`}
            />
          )}
          <p>
            {guests?.fullName || "Unknown Guest"}{" "}
            {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span className="bull">&bull;</span>
          <p>{guests?.email || "No Email"}</p>
          <span className="bull">&bull;</span>
          <p>National ID {guests?.nationalID || "Unknown"}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <Price isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice
              )} breakfast)`}
          </DataItem>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
