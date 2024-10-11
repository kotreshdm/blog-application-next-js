import axios from "axios";
console.log(process.env.DB_URI);
console.log(process.env.API);
const api = axios.create({
  baseURL: process.env.API || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors here (e.g., redirect to login if unauthorized)
    if (error.response && error.response.status === 401) {
      // Redirect to login or refresh token
    }
    return Promise.reject(error);
  }
);

const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error("Server Error:", error.response.data);
    console.error("Status Code:", error.response.status);
    return Promise.reject({
      message: error.response.data.message || "An error occurred",
      status: error.response.status,
    });
  } else if (error.request) {
    // The request was made but no response was received
    console.error("Network Error:", error.request);
    return Promise.reject({
      message: "Network error. Please check your internet connection.",
      status: 0,
    });
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Error:", error.message);
    return Promise.reject({
      message: "An unexpected error occurred.",
      status: 0,
    });
  }
};

const apiService = {
  get: (url, config = {}) => api.get(url, config).catch(handleApiError),
  post: (url, data, config = {}) =>
    api.post(url, data, config).catch(handleApiError),
  put: (url, data, config = {}) =>
    api.put(url, data, config).catch(handleApiError),
  delete: (url, config = {}) => api.delete(url, config).catch(handleApiError),
};

export default apiService;
