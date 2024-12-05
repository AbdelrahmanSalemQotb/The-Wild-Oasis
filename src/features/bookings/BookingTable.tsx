import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useBookings } from "./useBookings";

import { PAGE_SIZE } from "../../utils/constants";
import Empty from "../../ui/common/errors/Empty";
import Spinner from "../../ui/common/loaders/Spinner";
import Pagination from "../../ui/ListControls/Pagination";
import Menus from "../../ui/Menus/Menus";
import Table from "../../ui/Table/Table";
import BookingRow from "./BookingRow";

function BookingTable() {
  const {
    bookings = [],
    count = 0,
    isLoading,
    error,
    currentpage,
  } = useBookings();
  const [, setSearchParams] = useSearchParams();

  const isBelow550px = useMediaQuery("(max-width: 550px)");

  useEffect(
    function () {
      if (error && currentpage > Math.ceil(count || 0 / PAGE_SIZE)) {
        setSearchParams({});
      }
    },
    [error, count, currentpage, setSearchParams]
  );

  if (isLoading) return <Spinner />;
  if (!bookings?.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table
        columns={`minmax(6ch,0.6fr) minmax(6ch,2fr) ${
          isBelow550px ? "" : "minmax(11ch,2.4fr)"
        } minmax(min-content,1.4fr) minmax(9ch,1fr) 15px`}
      >
        <Table.Header>
          <div title="Cabin">Cabin</div>
          {!isBelow550px && <div title="Guest">Guest</div>}
          <div title="Dates">Dates</div>
          <div title="Status">Status</div>
          <div title="Amount">Amount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={bookings ?? []}
          render={(booking) => (
            <BookingRow
              key={booking.id}
              booking={booking}
              isGuestShown={!isBelow550px}
            />
          )}
        />

        <Table.Footer>
          <Pagination count={count || 0} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
