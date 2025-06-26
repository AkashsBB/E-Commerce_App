import axios from "axios";

const axiosinstance = axios.create({
  baseURL : import.meta.mode === "development" ? "http://localhost:5000/api" : "/api",
  withCredentials: true //allows send cookie in req by default
})

export default axiosinstance;