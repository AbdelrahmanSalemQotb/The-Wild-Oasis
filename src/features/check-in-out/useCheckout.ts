import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBooking } from "../../services/apiBookings";
import { BookingType } from "../Types/BookingTypes";

type BookingId = number;

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckout } = useMutation<
    BookingType,
    Error,
    BookingId
  >({
    mutationFn: (bookingId: BookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },

    onError: () => toast.error("There was an error while checking out"),
  });

  return { checkout, isCheckout };
}
