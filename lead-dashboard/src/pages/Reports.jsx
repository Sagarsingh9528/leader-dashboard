import { useEffect, useState } from "react";
import { exportCSV } from "../utils/helper";
import { getLeads } from "../api/leadApi";

const Reports = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    city: "",
    status: "",
    service: "",
    fromDate: "",
    toDate: "",
  });

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const query = new URLSearchParams(filters).toString();

      const res = await getLeads(`?${query}`);

      setLeads(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [filters]);

  return (
    <div className="w-full p-4 sm:p-6 space-y-6">

      <h1 className="text-2xl font-semibold">Reports</h1>
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

          <input
            type="date"
            className="border p-2 rounded"
            value={filters.fromDate}
            onChange={(e) =>
              setFilters({ ...filters, fromDate: e.target.value })
            }
          />

          <input
            type="date"
            className="border p-2 rounded"
            value={filters.toDate}
            onChange={(e) =>
              setFilters({ ...filters, toDate: e.target.value })
            }
          />

          <input
            placeholder="City"
            className="border p-2 rounded"
            value={filters.city}
            onChange={(e) =>
              setFilters({ ...filters, city: e.target.value })
            }
          />

          <select
            className="border p-2 rounded"
            value={filters.status}
            onChange={(e) =>
              setFilters({ ...filters, status: e.target.value })
            }
          >
            <option value="">All Status</option>
            <option>New</option>
            <option>Interested</option>
            <option>Converted</option>
            <option>Rejected</option>
          </select>

          <input
            placeholder="Service"
            className="border p-2 rounded"
            value={filters.service}
            onChange={(e) =>
              setFilters({ ...filters, service: e.target.value })
            }
          />
        </div>


        <div className="flex gap-3 flex-wrap">
          <button
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            onClick={() =>
              setFilters({
                city: "",
                status: "",
                service: "",
                fromDate: "",
                toDate: "",
              })
            }
          >
            Clear Filters
          </button>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => exportCSV(leads)}
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No data found
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead._id} className="border-t">
                  <td className="p-3">{lead.name}</td>
                  <td className="p-3">{lead.city}</td>
                  <td className="p-3">{lead.service}</td>
                  <td className="p-3">{lead.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="text-sm text-gray-600">
        Showing {leads.length} leads
      </div>

    </div>
  );
};

export default Reports;