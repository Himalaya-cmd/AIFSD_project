import axios from "axios";

const API = axios.create({
  baseURL: "https://employee-ai-backend-sc17.onrender.com",
});


// TOKEN ADD
API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;