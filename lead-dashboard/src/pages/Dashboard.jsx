import { useEffect, useState } from "react";
import StatusChart from "../components/charts/StatusChart";
import CityChart from "../components/charts/CityChart";
import ServiceChart from "../components/charts/ServiceChart";
import { getLeads } from "../api/leadApi";

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await getLeads();
      setLeads(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <p className="text-gray-500 text-sm">Total Leads</p>

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : (
            <h2 className="text-2xl sm:text-3xl font-bold mt-1">
              {leads.length}
            </h2>
          )}
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <StatusChart leads={leads} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <CityChart leads={leads} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <ServiceChart leads={leads} />
        </div>

      </div>

    </div>
  );
};

export default Dashboard;