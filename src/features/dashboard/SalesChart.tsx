import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import { useDarkMode } from "../../context/DarkModeContext";
import Heading from "../../ui/common/components/Heading";
import DashboardBox from "./DashboardBox";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
  @media (max-width: 400px) {
    font-size: 1rem;
  }
`;

type SalesChartProps = {
  bookings: { created_at: string; totalPrice: number; extrasPrice: number }[];

  numDays: number;
};

function SalesChart({ bookings, numDays }: SalesChartProps) {
  const { isDarkMode } = useDarkMode();
  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  const allDays = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDays.map((day) => {
    const label = format(day, "MMM dd");

    const { totalSales, extrasSales } = bookings
      .filter((booking) => isSameDay(day, booking.created_at))
      .reduce(
        (acc, booking) => ({
          totalSales: acc.totalSales + booking.totalPrice,
          extrasSales: acc.extrasSales + booking.extrasPrice,
        }),
        { totalSales: 0, extrasSales: 0 }
      );

    return { label, totalSales, extrasSales };
  });
  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDays.at(0) as Date, "MMM dd yyyy")} &mdash;{" "}
        {format(allDays.at(-1) as Date, "MMM dd yyyy")}{" "}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            padding={{ left: 0, right: 0 }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            {...colors.totalSales}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            {...colors.extrasSales}
            strokeWidth={2}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
