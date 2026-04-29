import { useEffect, useState } from "react";
import { getLeads } from "../api/leadApi";

const useLeads = () => {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    const res = await getLeads();
    setLeads(res.data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return { leads, fetchLeads };
};

export default useLeads;