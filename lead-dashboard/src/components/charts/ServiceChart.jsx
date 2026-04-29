import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const ServiceChart = ({ leads }) => {
  const serviceMap = {};

  leads.forEach((lead) => {
    serviceMap[lead.service] = (serviceMap[lead.service] || 0) + 1;
  });

  const data = Object.keys(serviceMap).map((service) => ({
    name: service,
    value: serviceMap[service],
  }));

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Service Distribution</h2>

      <BarChart width={400} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default ServiceChart;