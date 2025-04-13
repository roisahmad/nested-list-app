import axios from "axios";

const API_ROOT = "https://v2.jokeapi.dev";

const apiClient = axios.create({
  baseURL: API_ROOT,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
