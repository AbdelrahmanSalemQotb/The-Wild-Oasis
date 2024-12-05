import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import {
  DashboardFilterOptions,
  DashboardFilterValues,
} from "./DashboardFilterOptions";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const lastParam = searchParams.get("last") || "7";
  const numDays: DashboardFilterValues = DashboardFilterOptions.some(
    (entry) => entry.value === lastParam
  )
    ? lastParam
    : "7";

  const queryDate = subDays(new Date(), Number(numDays)).toISOString();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { bookings: bookings ?? [], isLoading };
}
