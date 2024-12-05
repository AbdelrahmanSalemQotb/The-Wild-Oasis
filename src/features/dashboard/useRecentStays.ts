import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import {
  DashboardFilterOptions,
  DashboardFilterValues,
} from "./DashboardFilterOptions";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const lastParam = searchParams.get("last") || "7";
  const numDays: DashboardFilterValues = DashboardFilterOptions.some(
    (entry) => entry.value === lastParam
  )
    ? lastParam
    : "7";

  const queryDate = subDays(new Date(), Number(numDays)).toISOString();

  const { data: stays, isLoading } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = stays?.filter((stay) => stay.status !== "unconfirmed");

  return {
    confirmedStays: confirmedStays ?? [],
    isLoading,
    numDays: Number(numDays),
  };
}
