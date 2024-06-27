import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { defaults } from "chart.js/auto";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartDash = ({ budgetList }) => {
  const chartData = {
    labels: budgetList.map((budget) => budget.name),
    datasets: [
      {
        label: "Total Spend",
        data: budgetList.map((budget) => budget.totalSpend),
        backgroundColor: "#283841",
      },
      {
        label: "Amount",
        data: budgetList.map((budget) => budget.amount),
        backgroundColor: "#BABEC2",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Activity",
      },
    },
  };

  return (
    <div className="w-full h-80 md:6/12 p-10 border rounded-lg">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChartDash;
