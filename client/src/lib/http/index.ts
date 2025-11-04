import axios from "axios";

const API = axios.create({
  baseURL: "https://restaurant-management-system-j9p7.vercel.app/api/",
  //https://restaurant-management-system-j9p7.vercel.app/ http://localhost:4000/api/

  headers: {
    "Content-Type": "application/json", // send vayirako data ko formate
    Accept: "application/json", // reciver huda kasto type ko fomate ko receive garna
  },
});
export default API;
