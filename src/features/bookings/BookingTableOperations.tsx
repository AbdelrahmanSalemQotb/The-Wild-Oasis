import { useMediaQuery } from "../../hooks/useMediaQuery";
import { FILTER_OPTIONS } from "./bookingFilterOptions";
import { SORTBY_OPTIONS } from "./bookingSortOptions";
import Filter from "../../ui/ListControls/Filter";
import SortBy from "../../ui/ListControls/SortBy";
import TableOperations from "../../ui/Table/TableOperations";

function BookingTableOperations() {
  const isBelow1120px = useMediaQuery("(max-width: 1120px)");

  return (
    <TableOperations>
      <Filter
        mediaQuery="(max-width: 670px)"
        filterField="status"
        options={FILTER_OPTIONS}
        isSelect={isBelow1120px}
      />

      <SortBy options={SORTBY_OPTIONS} mediaQuery="(max-width: 670px)" />
    </TableOperations>
  );
}

export default BookingTableOperations;
