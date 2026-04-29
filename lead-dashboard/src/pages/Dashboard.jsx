import { useEffect, useState } from "react";
import StatusChart from "../components/charts/StatusChart";
import CityChart from "../components/charts/CityChart";
import ServiceChart from "../components/charts/ServiceChart";

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("leads")) || [];
    setLeads(data);
  }, []);

  return (
    <div className="p-4 sm:p-6">

      <h1 className="text-xl sm:text-2xl font-bold">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 shadow rounded flex flex-col justify-center items-center sm:items-start">
          <p className="text-gray-500 text-sm">Total Leads</p>
          <h2 className="text-2xl sm:text-3xl font-bold">
            {leads.length}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">

        <div className="bg-white p-4 rounded shadow w-full">
          <StatusChart leads={leads} />
        </div>

        <div className="bg-white p-4 rounded shadow w-full">
          <CityChart leads={leads} />
        </div>

        <div className="bg-white p-4 rounded shadow w-full">
          <ServiceChart leads={leads} />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;