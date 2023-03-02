import React from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const Chart = ({ coins }) => {
  return (
    <ResponsiveContainer width={"99%"} height={300}>
      <AreaChart data={coins} width={"99%"}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451B7" stopOpacity="0.3" />
            <stop offset="75%" stopColor="#2451B7" stopOpacity="0.01" />
          </linearGradient>
        </defs>
        <Area dataKey="price" fill="url(#color)" stroke="#2451B7" />
        <YAxis
          dataKey="price"
          axisLine={false}
          tickLine={false}
          tickCount={8}
          stroke="#85899a"
          font-weight="bold"
          tickFormatter={(number) => `$${number.toFixed(2)}`}
        />
        <XAxis stroke="#85899a" font-weight="bold" />
        <Tooltip
          dataKey="price"
          tooltipFormatter={(number) => `$${number.toFixed(2)}`}
        />
        <CartesianGrid opacity="0.2" stroke="#2451B7" vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
