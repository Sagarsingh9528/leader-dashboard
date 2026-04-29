import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getLeads = () => API.get("/leads");
export const createLead = (data) => API.post("/leads", data);
export const updateLead = (id, data) => API.put(`/leads/${id}`, data);