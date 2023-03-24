import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

const NewChart = ({ coins }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = coins.map((item, mov) => mov);

  const lines = coins.map((item) => +item.price);
  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: lines,
        fill: true, // Set fill property to 'origin' to fill area under the line
        borderColor: "#2451B7",
        backgroundColor: "rgba(36, 81, 183, .1)", // Set the background color for the area
        borderWidth: 1,
      },
    ],
    options: {
      scales: {
        y: {
          ticks: {
            callback: labels,
          },
        },
      },
    },
  };
  return <Line options={options} data={data} />;
};
export default NewChart;
