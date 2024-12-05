import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBooking } from "../../services/apiBookings";
import { BookingType, BookingUpdates } from "../Types/BookingTypes";

type MutationArgs = {
  bookingId: number;
  breakfast?: BookingUpdates;
};

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckin } = useMutation<
    BookingType,
    Error,
    MutationArgs
  >({
    mutationFn: ({ bookingId, breakfast = {} }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      navigate("/");
    },

    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkin, isCheckin };
}
