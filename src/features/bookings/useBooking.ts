import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking as getBookingApi } from "../../services/apiBookings";
import { BookingWithCabinAndGuest } from "../Types/BookingTypes";

export function useBooking() {
  const { bookingId } = useParams();

  const { data: booking, isLoading } = useQuery<BookingWithCabinAndGuest>({
    queryKey: ["bookings", bookingId],
    queryFn: () => getBookingApi(Number(bookingId)),
  });

  return { booking, isLoading };
}
