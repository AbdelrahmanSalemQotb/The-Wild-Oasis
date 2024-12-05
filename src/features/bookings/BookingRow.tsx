import { useNavigate } from "react-router-dom";
import { format, isToday } from "date-fns";
import styled from "styled-components";

import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";

import ConfirmDelete from "../../ui/ConfirmDelete/ConfirmDelete";
import Menus from "../../ui/Menus/Menus";
import Modal from "../../ui/Modal/Modal";
import Table from "../../ui/Table/Table";
import Tag from "../../ui/Tag";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { useCheckout } from "../check-in-out/useCheckout";
import { BookingWithCabinAndGuest } from "../Types/BookingTypes";
import { statusToTagName } from "./bookingHelper";
import { useDeleteBooking } from "./useDeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
  @media (max-width: 500px) {
    font-size: 1.2rem;
  }
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  overflow: hidden;
  text-align: center;

  & span:first-child {
    font-weight: 500;
    text-overflow: ellipsis;
  }

  & span:last-child {
    color: var(--color-grey-500);
    text-overflow: ellipsis;

    font-size: 1.2rem;
  }

  @media (max-width: 430px) {
    & span:first-child,
    & span:last-child {
      font-size: 80%;
    }
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  isGuestShown,
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests,
    cabins,
  },
}: {
  booking: BookingWithCabinAndGuest;
  isGuestShown: boolean;
}) {
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { checkout, isCheckout } = useCheckout();
  const navigate = useNavigate();

  return (
    <Table.Row>
      <Modal>
        <Cabin>{cabins?.name || "-"}</Cabin>

        {isGuestShown && (
          <Stacked>
            <span>{guests?.fullName || "-"}</span>
            <span>{guests?.email || "-"}</span>
          </Stacked>
        )}

        <Stacked>
          <span>
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}{" "}
            {isGuestShown ? <>&rarr;</> : <br />} {numNights} night stay
          </span>
          <span>
            {format(new Date(startDate), "MMM dd yyyy")}
            {isGuestShown ? <>&mdash;</> : <br />}{" "}
            {format(new Date(endDate), "MMM dd yyyy")}
          </span>
        </Stacked>

        <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

        <Amount>{formatCurrency(totalPrice)}</Amount>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />

          <Menus.List id={bookingId}>
            <Menus.Button
              onClick={() => navigate(`/bookings/${bookingId}`)}
              icon={<HiEye />}
            >
              See Details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
                disabled={isCheckout}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens={bookingId}>
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name={bookingId}>
            <ConfirmDelete
              resourceName="Booking"
              onConfirm={() => deleteBooking(bookingId)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
