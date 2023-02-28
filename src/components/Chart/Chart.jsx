import React from "react";
import {
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
  Area,  
} from "recharts";
import style from "./Chart.module.scss";
const Chart = ({ coins }) => {
  return (
    <div className={style.chart}>
      <ResponsiveContainer height={200}>
        <ComposedChart
          width={500}
          height={400}
          data={coins}
          viewBox={{ width: 800, height: 600 }}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          {/* <Line type="monotone" dataKey="price" stroke="#8884d8" /> */}
          <YAxis dataKey="price" />
          <XAxis />
          <Tooltip dataKey="tool" />
          <Area
            type="monotone"
            dataKey="price"
            fill="#77a9f33b"
            viewBox={{ width: 800, height: 600 }}
          />
          <Legend />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
