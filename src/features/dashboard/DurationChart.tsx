import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styled from "styled-components";
import { useDarkMode } from "../../context/DarkModeContext";
import Heading from "../../ui/common/components/Heading";
import { BookingType } from "../Types/BookingTypes";
import { GuestType } from "../Types/GuestTypes";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem;
  grid-column: span 2;

  @media (max-width: 400px) {
    padding: 2.4rem 0.8rem;
    gap: 1rem;
  }

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;
const startData = [
  {
    duration: "1 night",
    value: 0,
    colorDark: "#b91c1c",
    colorLight: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 0,
    colorDark: "#c2410c",
    colorLight: "#f97316",
  },
  {
    duration: "3 nights",
    value: 0,
    colorDark: "#a16207",
    colorLight: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 0,
    colorDark: "#4d7c0f",
    colorLight: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    colorDark: "#15803d",
    colorLight: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    colorDark: "#0f766e",
    colorLight: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 0,
    colorDark: "#1d4ed8",
    colorLight: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 0,
    colorDark: "#7e22ce",
    colorLight: "#a855f7",
  },
];
const durationOptions = startData.map((option) => {
  const [min, max] = option.duration
    .replace("+", "-Infinity")
    .split(" ")[0]
    .split("-")
    .map((str) => (str === "Infinity" ? Infinity : Number(str)));
  return { ...option, range: [min, max] };
});

type StartData = typeof durationOptions;
type Stay = BookingType & Partial<GuestType>;

function prepareData(startData: StartData, stays: Stay[]) {
  // Reset value explicitly to 0
  const newData = startData.map((item) => ({ ...item, value: 0 }));

  stays.forEach(({ numNights }) => {
    const item = newData.find(({ range: [min, max] }) =>
      max === undefined
        ? numNights === min
        : numNights >= min && numNights <= max
    );
    if (item) {
      item.value++;
      return true;
    }
  });

  return newData.filter(({ value }) => value > 0);
}

function DurationChart({ confirmedStays }: { confirmedStays: Stay[] }) {
  const { isDarkMode } = useDarkMode();
  const color = isDarkMode ? "colorDark" : "colorLight";
  const data = prepareData(durationOptions, confirmedStays);

  return (
    <ChartBox>
      <Heading as="h2">Stay duration summary</Heading>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="50%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry[color]}
                stroke={entry[color]}
                key={entry[color]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            iconSize={15}
            layout="vertical"
            verticalAlign="middle"
            align="center"
            iconType="circle"
            wrapperStyle={{
              fontSize: "1.2rem",
              lineHeight: "1.6rem",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
