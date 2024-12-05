import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import { BookingType } from "../Types/BookingTypes";
import { GuestType } from "../Types/GuestTypes";
import Stat from "./Stat";

type StatsProps = {
  bookings: { created_at: string; totalPrice: number; extrasPrice: number }[];
  confirmedStays: (BookingType & Partial<GuestType>)[];
  numDays: number;
  cabinCount: number;
};

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}: StatsProps) {
  // 1.
  const numBookings = bookings?.length || 0;

  // 2.
  const sales =
    bookings?.reduce((acc, booking) => acc + booking.totalPrice, 0) || 0;

  // 3.
  const checkins = confirmedStays?.length;

  // 4.
  const occupation =
    confirmedStays.reduce((acc, stay) => acc + stay.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}
