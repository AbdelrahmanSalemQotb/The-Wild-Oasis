import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";
import { FilterValue, SortByValue } from "../Types/BookingTypes";
import { FILTER_OPTIONS } from "./bookingFilterOptions";
import { SORTBY_OPTIONS } from "./bookingSortOptions";

export function useBookings() {
  const [searchParams] = useSearchParams();

  // 1) Filter
  const statusFilter = searchParams.get("status");

  // validate Filter
  const finalFilter: FilterValue | null = FILTER_OPTIONS.some(
    (option) => option.value === statusFilter && option.value !== "all"
  )
    ? (statusFilter as FilterValue)
    : null;

  // 2) Sort
  const sortBy = searchParams.get("sortBy") || SORTBY_OPTIONS.at(0)?.value;

  // validate SortBy
  const finalSortBy: SortByValue = SORTBY_OPTIONS.some(
    (option) => option.value === sortBy
  )
    ? (sortBy as SortByValue)
    : SORTBY_OPTIONS.at(0)?.value ?? "startDate-asc";

  // 3) PAGINATION
  const page =
    !searchParams.get("page") ||
    isNaN(Number(searchParams.get("page"))) ||
    Number(searchParams.get("page")) < 1
      ? 1
      : Number(searchParams.get("page"));

  const {
    data: bookingsData,

    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", finalFilter || "all", finalSortBy, page],

    queryFn: () =>
      getBookings({
        filter: { value: finalFilter, field: "status" },
        sortBy: finalSortBy,
        page,
      }),
  });

  const queryClient = useQueryClient();
  const pageCount = Math.ceil((bookingsData?.count || 0) / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", finalFilter || "all", finalSortBy, page + 1],
      queryFn: () =>
        getBookings({
          filter: { value: finalFilter, field: "status" },
          sortBy: finalSortBy,
          page: page + 1,
        }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", finalFilter || "all", finalSortBy, page - 1],
      queryFn: () =>
        getBookings({
          filter: { value: finalFilter, field: "status" },
          sortBy: finalSortBy,
          page: page - 1,
        }),
    });
  }

  return {
    bookings: bookingsData?.data,
    count: bookingsData?.count,
    error,
    isLoading,
    currentpage: page,
  };
}
