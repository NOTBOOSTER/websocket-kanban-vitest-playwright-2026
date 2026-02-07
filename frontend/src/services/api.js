import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

export const taskApi = {
  getAll: () => api.get("/tasks"),
  create: (data) => {
    if (data instanceof FormData) {
      return api.post("/tasks", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
    return api.post("/tasks", data);
  },
  update: (id, data) => api.put(`/tasks/${id}`, data),
  delete: (id) => api.delete(`/tasks/${id}`),
};

export default api;
