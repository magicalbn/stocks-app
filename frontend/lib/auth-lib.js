import axios from "../config/axios.config";

export const userLogin = async (body) => {
    const { data } = await axios.post("/api/auth/login", body);
    return data;
};

export const userRegister = async (body) => {
    const { data } = await axios.post("/api/auth/signup", body);
    return data;
};

export const userGetdetails = async (body) => {
    const { data } = await axios.get("/api/auth/getuser");
    return data;
};

export const userLogout = async (body) => {
    const { data } = await axios.get("/api/auth/logout");
    return data;
};
