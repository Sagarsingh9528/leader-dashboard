import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const CityChart = ({ leads }) => {
  const cityMap = {};

  leads.forEach((lead) => {
    cityMap[lead.city] = (cityMap[lead.city] || 0) + 1;
  });

  const data = Object.keys(cityMap).map((city) => ({
    name: city,
    value: cityMap[city],
  }));

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">City Distribution</h2>

      <BarChart width={400} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default CityChart;