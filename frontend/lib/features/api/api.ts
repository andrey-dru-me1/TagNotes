import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        await axios.post("/api/token/refresh");
        return axios(originalRequest);
      } catch (e) {
        window.location.href = "/login";
      }
    }
  }
);

export default api;
