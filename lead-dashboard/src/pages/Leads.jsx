import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { getLeads, deleteLead } from "../api/leadApi";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await getLeads();
      setLeads(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete?");
    if (!confirmDelete) return;

    try {
      await deleteLead(id);
      setLeads((prev) => prev.filter((lead) => lead._id !== id));

      alert("Deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Leads</h1>

        <Button onClick={() => navigate("/add-lead")}>
          Add Lead
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-left">Name</th>
              <th className="p-3 border text-left">City</th>
              <th className="p-3 border text-left">Status</th>
              <th className="p-3 border text-left">Action</th>
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
                  No leads found
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead._id} className="border-t">
                  <td className="p-3">{lead.name}</td>
                  <td className="p-3">{lead.city}</td>
                  <td className="p-3">{lead.status}</td>

                  <td className="p-3 flex gap-2">
                    {/* Edit */}
                    <Button
                      variant="secondary"
                      onClick={() => navigate(`/edit/${lead._id}`)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => handleDelete(lead._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leads;