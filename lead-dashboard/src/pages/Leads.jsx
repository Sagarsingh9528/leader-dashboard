import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("leads")) || [];
    setLeads(data);
  }, []);

  const handleEdit = (lead) => {
    setEditId(lead.id);
    setEditData(lead);
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleUpdate = () => {
    const updatedLeads = leads.map((lead) =>
      lead.id === editId ? editData : lead
    );

    setLeads(updatedLeads);
    localStorage.setItem("leads", JSON.stringify(updatedLeads));
    setEditId(null);
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
              <th className="p-2 border">Name</th>
              <th className="p-2 border">City</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No leads found
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="border p-2">
                    {editId === lead.id ? (
                      <input
                        name="name"
                        value={editData.name}
                        onChange={handleChange}
                        className="border p-1 w-full"
                      />
                    ) : (
                      lead.name
                    )}
                  </td>

                  <td className="border p-2">
                    {editId === lead.id ? (
                      <input
                        name="city"
                        value={editData.city}
                        onChange={handleChange}
                        className="border p-1 w-full"
                      />
                    ) : (
                      lead.city
                    )}
                  </td>

                  <td className="border p-2">
                    {editId === lead.id ? (
                      <select
                        name="status"
                        value={editData.status}
                        onChange={handleChange}
                        className="border p-1 w-full"
                      >
                        <option>New</option>
                        <option>Interested</option>
                        <option>Converted</option>
                        <option>Rejected</option>
                      </select>
                    ) : (
                      lead.status
                    )}
                  </td>

                  <td className="border p-2">
                    {editId === lead.id ? (
                      <Button onClick={handleUpdate}>
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        onClick={() => handleEdit(lead)}
                      >
                        Edit
                      </Button>
                    )}
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