export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN");
};

export const filterLeads = (leads, filters) => {
  return leads.filter((lead) => {
    const createdDate = new Date(lead.createdAt || Date.now());

    return (
      (!filters.city ||
        lead.city.toLowerCase().includes(filters.city.toLowerCase())) &&
      (!filters.status || lead.status === filters.status) &&
      (!filters.service ||
        lead.service.toLowerCase().includes(filters.service.toLowerCase())) &&
      (!filters.fromDate ||
        createdDate >= new Date(filters.fromDate)) &&
      (!filters.toDate ||
        createdDate <= new Date(filters.toDate))
    );
  });
};

export const exportCSV = (data) => {
  if (!data || data.length === 0) {
    alert("No data to export");
    return;
  }

  const headers = ["Name", "City", "Service", "Status"];

  const rows = data.map((lead) => [
    lead.name,
    lead.city,
    lead.service,
    lead.status,
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows].map((row) => row.join(",")).join("\n");

  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.download = "report.csv";
  link.click();
};

export const validateLead = (form) => {
  if (!form.name || !form.mobile || !form.email) {
    return "Name, Mobile and Email are required";
  }

  if (form.mobile.length < 10) {
    return "Invalid mobile number";
  }

  return null;
};