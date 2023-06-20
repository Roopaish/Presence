import axios from "axios";

export const apiURL = process.env.NEXT_PUBLIC_API_URL;

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
