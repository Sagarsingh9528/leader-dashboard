import { useState } from "react";
import { useParams } from "react-router-dom";
import { updateLead } from "../api/leadApi";

const EditLead = () => {
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    city: "",
    status: "New",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateLead(id, form);
    alert("Updated!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <input name="name" onChange={handleChange} placeholder="Name" />
      <input name="city" onChange={handleChange} placeholder="City" />

      <select name="status" onChange={handleChange}>
        <option>New</option>
        <option>Interested</option>
        <option>Converted</option>
        <option>Rejected</option>
      </select>

      <button className="bg-green-500 text-white px-4 py-2">
        Update
      </button>
    </form>
  );
};

export default EditLead;