import Filter from "../../ui/ListControls/Filter";
import { DashboardFilterOptions } from "./DashboardFilterOptions";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      mediaQuery="(max-width: 500px)"
      options={DashboardFilterOptions}
    />
  );
}

export default DashboardFilter;
