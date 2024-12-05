// import { ICabinType } from "./CabinTypes";
// import { GuestType } from "./GuestTypes";
import {
  FILTER_OPERATIONS,
  FILTER_OPTIONS,
} from "../bookings/bookingFilterOptions";
import { SORTBY_OPTIONS } from "../bookings/bookingSortOptions";
import { Tables } from "./SupabaseTypes";

export type BookingType = Tables<"bookings">;

export type BookingWithGuest = Tables<"bookings"> & {
  guests: Tables<"guests"> | null;
};
export type BookingWithPartialGuest = Tables<"bookings"> & {
  guests: Partial<Tables<"guests">> | null;
};

export type BookingWithCabin = Tables<"bookings"> & {
  cabins: Tables<"cabins"> | null;
};
export type BookingWithPartialCabin = Tables<"bookings"> & {
  cabins: Partial<Tables<"cabins">> | null;
};

export type BookingWithCabinAndGuest = BookingWithGuest & BookingWithCabin;

export type TagColor = "blue" | "green" | "silver";

export type FilterField = keyof BookingType;
export type FilterValue = (typeof FILTER_OPTIONS)[number]["value"];
export type FilterOperators =
  (typeof FILTER_OPERATIONS)[keyof typeof FILTER_OPERATIONS];

export type SortByValue = (typeof SORTBY_OPTIONS)[number]["value"];

export type BookingUpdates = Partial<BookingType>;
