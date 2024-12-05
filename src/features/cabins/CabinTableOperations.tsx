import { useMediaQuery } from "../../hooks/useMediaQuery";
import Filter from "../../ui/ListControls/Filter";
import SortBy from "../../ui/ListControls/SortBy";
import TableOperations from "../../ui/Table/TableOperations";
import { FILTER_OPTIONS } from "./cabinFilterOptions";
import { SORTBY_OPTIONS } from "./cabinSortOptions";

function CabinTableOperations() {
  const isBelow1120px = useMediaQuery("(max-width: 1120px)");

  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={FILTER_OPTIONS}
        isSelect={isBelow1120px}
        mediaQuery="(max-width: 670px)"
      />
      <SortBy options={SORTBY_OPTIONS} mediaQuery="(max-width: 670px)" />
    </TableOperations>
  );
}

export default CabinTableOperations;
