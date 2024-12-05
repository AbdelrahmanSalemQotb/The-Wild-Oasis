import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";

import Button from "../../ui/Buttons/Button";
import ButtonGroup from "../../ui/Buttons/ButtonGroup";
import ButtonText from "../../ui/Buttons/ButtonText";
import Heading from "../../ui/common/components/Heading";
import Row from "../../ui/common/components/Row";

import { useEffect, useState } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";
import Empty from "../../ui/common/errors/Empty";
import Spinner from "../../ui/common/loaders/Spinner";
import Checkbox from "../../ui/Form/FormControls/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useBooking } from "../bookings/useBooking";
import { useSettings } from "../settings/useSettings";
import { useCheckin } from "./useCheckin";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;

  @media (max-width: 600px) {
    padding: 2rem 2rem;
    font-size: 1.4rem;
  }
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { booking, isLoading: isLoadingBooking } = useBooking();
  const { checkin, isCheckin } = useCheckin();

  useEffect(() => {
    if (addBreakfast) setConfirmPaid(false);
    else setConfirmPaid(booking?.isPaid ?? false);
  }, [booking?.isPaid, addBreakfast]);

  if (isLoadingBooking || isLoadingSettings) return <Spinner />;

  if (!booking || !Object.keys(booking).length || !settings)
    return <Empty resourceName="Checkin" />;

  if (settings?.breakfastPrice == null) {
    throw new Error("Breakfast price not found in settings");
  }

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings?.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    const checkinData = {
      bookingId,
      breakfast: addBreakfast
        ? {
            hasBreakfast: true,
            extrasPrice: optionalBreakfastPrice,
            totalPrice: optionalBreakfastPrice + totalPrice,
          }
        : {},
    };

    checkin(checkinData);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={hasBreakfast || addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckin}
          id={"confirm"}
        >
          I confirm that {guests?.fullName} has paid the total amount of{" "}
          {addBreakfast
            ? `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
