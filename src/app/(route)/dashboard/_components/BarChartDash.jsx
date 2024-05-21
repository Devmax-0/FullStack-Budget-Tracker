import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BarChartDash = ({ budgetList }) => {
  // Map budgetList to the expected data format for the chart
  const chartData = budgetList.map((budget) => ({
    name: budget.name,
    totalSpend: budget.totalSpend,
    amount: budget.amount,
  }));

  return (
    <div className="p-10 border rounded-lg ">
      <p className="font-bold text-lg mb-5">Activity</p>
      <ResponsiveContainer width="80%" height={300}>
        <BarChart
          data={chartData}
          margin={{
            top: 7,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSpend" stackId="a" fill="#283841" />
          <Bar dataKey="amount" stackId="a" fill="#BABEC2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartDash;
