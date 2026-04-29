import { useState } from "react";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import Button from "../components/common/Button";

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
  const [form, setForm] = useState(() => {
    try {
      const saved = localStorage.getItem("leadForm");
      return saved ? JSON.parse(saved) : defaultForm;
    } catch {
      return defaultForm;
    }
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value =
      e.target.name === "budget"
        ? Number(e.target.value)
        : e.target.value;

    const updated = {
      ...form,
      [e.target.name]: value,
    };

    setForm(updated);
    localStorage.setItem("leadForm", JSON.stringify(updated));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.mobile || !form.email) {
      alert("Please fill required fields");
      return;
    }

    setLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 500));
      const existingLeads =
        JSON.parse(localStorage.getItem("leads")) || [];

      const updatedLeads = [
        ...existingLeads,
        { ...form, id: Date.now() },
      ];

      localStorage.setItem("leads", JSON.stringify(updatedLeads));

      console.log("Saved:", form);

      alert("Lead Added Successfully");

      // ✅ 4. Reset form + clear temp storage
      setForm(defaultForm);
      localStorage.removeItem("leadForm");

    } catch (err) {
      console.error(err);
      alert("Error submitting form");
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

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>

      </form>
    </div>
  );
};

export default AddLead;