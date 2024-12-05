import supabase from "./supabase";
import { getToday } from "../utils/helpers";
import { PAGE_SIZE } from "../utils/constants";
import {
  BookingType,
  BookingUpdates,
  BookingWithCabinAndGuest,
  FilterField,
  FilterOperators,
  FilterValue,
  SortByValue,
} from "../features/Types/BookingTypes";

type GetBookingsProps = {
  filter?: {
    value: FilterValue | null;
    field: FilterField;
    operation?: FilterOperators;
  };
  sortBy: SortByValue;
  page: number;
};

export async function getBookings({ filter, sortBy, page }: GetBookingsProps) {
  const operation = filter?.operation || "eq";

  let query = supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)", { count: "exact" });

  // 1)FILTER
  if (filter && filter.value) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query = (query as any)[operation](filter.field, filter.value);
  }

  // 2) Sort
  if (sortBy) {
    const [sortByField, direction] = sortBy.split("-");
    query = query.order(sortByField, { ascending: direction === "asc" });
  }

  // 3) Page
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings not found");
  }

  return { data, count };
}

export async function getBooking(
  id: number
): Promise<BookingWithCabinAndGuest> {
  if (!id) return {} as BookingWithCabinAndGuest;

  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  if (!data.cabins || !data.guests) {
    throw new Error("Booking is missing related data (guest or cabin)");
  }
  return data as BookingWithCabinAndGuest;
}

export async function deleteBooking(id: number) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());
  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export type UpdateBookingFunction = (
  id: number,
  updates: BookingUpdates
) => Promise<BookingType>;

export const updateBooking: UpdateBookingFunction = async function (id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error || !data) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  return data;
};
