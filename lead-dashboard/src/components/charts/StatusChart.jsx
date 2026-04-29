import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const StatusChart = ({ leads = [] }) => {
  const data = [
    { name: "New", value: leads.filter(l => l.status === "New").length },
    { name: "Interested", value: leads.filter(l => l.status === "Interested").length },
    { name: "Converted", value: leads.filter(l => l.status === "Converted").length },
    { name: "Rejected", value: leads.filter(l => l.status === "Rejected").length },
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Status Distribution</h2>

      <PieChart width={350} height={250}>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={90}>
          {(data || []).map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default StatusChart;