import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api/",
  // /baseURL: "https://rms-backend-m65u.onrender.com/api/",
  headers: {
    "Content-Type": "application/json", // send vayirako data ko formate
    Accept: "application/json", // reciver huda kasto type ko fomate ko receive garna
  },
});
export default API;
