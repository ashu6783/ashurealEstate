import axios from "axios";

const apiRequest = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? "http://localhost:5000/api"
    : "https://ashurealestate.onrender.com/api",
  withCredentials: true,
});


// Optional: Log outgoing requests for debugging
apiRequest.interceptors.request.use(
  (config) => {
    console.log(`[API REQUEST] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Log 401 errors
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
