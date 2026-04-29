import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";

import Dashboard from "../pages/Dashboard";
import Leads from "../pages/Leads";
import AddLead from "../pages/AddLead";
import Reports from "../pages/Reports";
import EditLead from "../pages/EditLead";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/add-lead" element={<AddLead />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/edit/:id" element={<EditLead />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRoutes;