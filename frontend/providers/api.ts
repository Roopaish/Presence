import axios from "axios";

export const apiURL = "http://localhost:8000";

axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: apiURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

export interface SimpleResponse {
  success: boolean;
  message: string;
}
