import { BookingType, TagColor } from "../Types/BookingTypes";

export const statusToTagName: Record<BookingType["status"], TagColor> = {
  unconfirmed: "blue",
  "checked-in": "green",
  "checked-out": "silver",
};
