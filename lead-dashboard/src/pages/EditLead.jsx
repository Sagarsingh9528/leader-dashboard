import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateLead, getLeads } from "../api/leadApi";

const EditLead = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    city: "",
    status: "New",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const res = await getLeads();
        const lead = res.data.find((item) => item._id === id);

        if (lead) {
          setForm({
            name: lead.name || "",
            city: lead.city || "",
            status: lead.status || "New",
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchLead();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.city) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await updateLead(id, form);
      alert("Lead Updated Successfully");
      navigate("/leads");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-lg">
      <h1 className="text-xl font-bold mb-4">Edit Lead</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />

        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full border p-2 rounded"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option>New</option>
          <option>Interested</option>
          <option>Converted</option>
          <option>Rejected</option>
        </select>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default EditLead;