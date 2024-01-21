import axios from "axios";

const dev = process.env.NODE_ENV !== "production";

const path = dev
    ? "http://localhost:3001"
    : "https://stocks-app-backend.onrender.com/";
// : "https://stocks-app-backend.vercel.app";

const instance = axios.create({
    baseURL: path,
    withCredentials: true,
});

export default instance;
