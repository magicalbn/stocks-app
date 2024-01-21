import axios from "../config/axios.config";

export const getStocks = async () => {
    const { data } = await axios.get("/api/transact/user/getstocks");
    return data;
};

export const buyStocks = async (body) => {
    const { data } = await axios.post("/api/transact/stocks/buy", body);
    return data;
};

export const sellStocks = async (body) => {
    const { data } = await axios.post("/api/transact/stocks/sell", body);
    return data;
};
