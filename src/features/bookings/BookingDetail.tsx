import styled from "styled-components";

import Button from "../../ui/Buttons/Button";
import ButtonGroup from "../../ui/Buttons/ButtonGroup";
import ButtonText from "../../ui/Buttons/ButtonText";
import Heading from "../../ui/common/components/Heading";
import Row from "../../ui/common/components/Row";
import Tag from "../../ui/Tag";
import BookingDataBox from "./BookingDataBox";

import { useNavigate } from "react-router-dom";
import { useMoveBack } from "../../hooks/useMoveBack";
import { statusToTagName } from "./bookingHelper";

import Empty from "../../ui/common/errors/Empty";
import Spinner from "../../ui/common/loaders/Spinner";
import ConfirmDelete from "../../ui/ConfirmDelete/ConfirmDelete";
import Modal from "../../ui/Modal/Modal";
import { useCheckout } from "../check-in-out/useCheckout";
import { useBooking } from "./useBooking";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const { booking, isLoading } = useBooking();
  const { checkout, isCheckout } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  if (isLoading) return <Spinner />;
  if (
    !booking ||
    !Object.keys(booking).length ||
    !booking.cabins ||
    !booking.guests
  )
    return <Empty resourceName="Booking" />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[booking.status]}>
            {booking.status.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {booking.status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${booking.id}`)}>
            Check in
          </Button>
        )}

        {booking.status === "checked-in" && (
          <Button onClick={() => checkout(booking.id)} disabled={isCheckout}>
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() =>
                deleteBooking(booking.id, {
                  onSettled: () => navigate(-1),
                })
              }
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
