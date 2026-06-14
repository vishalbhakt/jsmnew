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
  if (Array.isArray(data)) return data;
  if (data.results && Array.isArray(data.results)) return data.results;
  if (data.data && Array.isArray(data.data)) return data.data;
  return [];
}

export async function createResource(endpoint, payload) {
  const { data } = await api.post(endpoint, payload);
  return data;
}

export async function updateResource(endpoint, id, payload) {
  const url = endpoint.endsWith("/") ? `${endpoint}${id}/` : `${endpoint}/${id}/`;
  const { data } = await api.put(url, payload);
  return data;
}

export async function deleteResource(endpoint, id) {
  const url = endpoint.endsWith("/") ? `${endpoint}${id}/` : `${endpoint}/${id}/`;
  await api.delete(url);
}

export async function optionsResource(endpoint) {
  const { data } = await api.options(endpoint);
  return data;
}

export function getErrorMessage(error, fallback = "An unexpected error occurred") {
  const data = error.response?.data;
  if (!data) return error.message || fallback;
  if (typeof data === "string") return data;
  if (data.detail) return data.detail;
  if (Array.isArray(data)) return data.join(" ");
  if (typeof data === "object") {
    return Object.entries(data)
      .map(([key, value]) => {
        const message = Array.isArray(value) ? value.join(" ") : value;
        if (key === "non_field_errors") return message;
        return `${key}: ${message}`;
      })
      .join(" ");
  }
  return fallback;
}

export { API_URL };
