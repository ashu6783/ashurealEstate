import axios from "axios";

const apiRequest = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? "http://localhost:5000/api"
    : import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});


apiRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized (401) - Check session or credentials");
    }
    return Promise.reject(error);
  }
);

export default apiRequest;
