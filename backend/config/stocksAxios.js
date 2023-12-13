const axios = require("axios");
require("dotenv").config();

const instance = axios.create({
    baseURL: "https://apidojo-yahoo-finance-v1.p.rapidapi.com",
    headers: {
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "x-rapidapi-host": process.env.RAPID_API_HOST,
    },
});

module.exports = instance;
