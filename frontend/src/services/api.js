import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jsm_access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const refresh = localStorage.getItem("jsm_refresh_token");

    if (error.response?.status === 401 && refresh && !original?._retry) {
      original._retry = true;
      const { data } = await axios.post(`${API_URL}/auth/token/refresh/`, { refresh });
      localStorage.setItem("jsm_access_token", data.access);
      if (data.refresh) {
        localStorage.setItem("jsm_refresh_token", data.refresh);
      }
      original.headers.Authorization = `Bearer ${data.access}`;
      return api(original);
    }

    return Promise.reject(error);
  },
);

export async function listResource(endpoint) {
  const { data } = await api.get(endpoint);
  return Array.isArray(data) ? data : data.results || [];
}

export async function createResource(endpoint, payload) {
  const { data } = await api.post(endpoint, payload);
  return data;
}

export { API_URL };
