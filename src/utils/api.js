import axios from "axios";

const api = axios.create({
  baseURL: process.env.API || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);

const handleApiError = (error) => {
  if (error.response) {
    console.error("Server Error:", error.response.data);
    console.error("Status Code:", error.response.status);
    return Promise.reject({
      message: error.response.data.message || "An error occurred",
      status: error.response.status,
    });
  } else if (error.request) {
    console.error("Network Error:", error.request);
    return Promise.reject({
      message: "Network error. Please check your internet connection.",
      status: 0,
    });
  } else {
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
