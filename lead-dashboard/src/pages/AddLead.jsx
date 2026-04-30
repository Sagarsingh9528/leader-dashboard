import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import Button from "../components/common/Button";
import { createLead } from "../api/leadApi";

const defaultForm = {
  name: "",
  mobile: "",
  email: "",
  city: "",
  service: "",
  budget: "",
  status: "New",
};

const AddLead = () => {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value =
      e.target.name === "budget"
        ? Number(e.target.value)
        : e.target.value;

    setForm({
      ...form,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.mobile || !form.email) {
      alert("Please fill required fields");
      return;
    }

    setLoading(true);

    try {
      await createLead(form);

      alert("Lead Added Successfully");

      setForm(defaultForm);
      navigate("/leads");

    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded">
      <h1 className="text-xl font-bold mb-4">Add Lead</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <Input
          label="Mobile"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
        />

        <Input
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          label="City"
          name="city"
          value={form.city}
          onChange={handleChange}
        />

        <Input
          label="Service"
          name="service"
          value={form.service}
          onChange={handleChange}
        />

        <Input
          label="Budget"
          name="budget"
          type="number"
          value={form.budget}
          onChange={handleChange}
        />

        <Select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={["New", "Interested", "Converted", "Rejected"]}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>

      </form>
    </div>
  );
};

export default AddLead;