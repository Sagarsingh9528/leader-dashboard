import axios from "axios";

const API = axios.create({
  baseURL: "https://leader-dashboard.onrender.com/api",
});

// ✅ attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const signupUser = (data) => API.post("/auth/signup", data);
export const loginUser = (data) => API.post("/auth/login", data);

export const getLeads = () => API.get("/leads");

export const createLead = (data) => API.post("/leads", data);

export const updateLead = (id, data) =>
  API.put(`/leads/${id}`, data);

export const deleteLead = (id) =>
  API.delete(`/leads/${id}`);

export default API;
