import axios from "axios";

const APIWITHTOKEN = axios.create({
  baseURL:
    "https://restaurant-management-system-backend-t7d5.onrender.com/api/",
  // // https://restaurant-management-system-j9p7.vercel.app/ "http://localhost:4000/api/"
  // baseURL: "http://localhost:4000/api/",

  headers: {
    Authorization:
      typeof window !== "undefined" ? localStorage.getItem("token") : null,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export default APIWITHTOKEN;
