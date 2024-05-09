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
  return (
    <div className="p-5 border rounded-lg">
      <p className="font-bold text-lg">Activity</p>
      <ResponsiveContainer width="80%" height={300}>
        <BarChart
          data={budgetList}
          margin={{
            top: 7,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSpent" stackId="a" fill="#283841 " />
          <Bar dataKey="budgetAmount" stackId="a" fill="#F1F5F9" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartDash;
