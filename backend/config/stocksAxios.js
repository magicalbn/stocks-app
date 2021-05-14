

const axios = require('axios');

const RAPID_API_KEY = 'c833609905msh4cfbadb31f70478p10106bjsne69a3f3fde70'
const RAPID_API_HOST ='apidojo-yahoo-finance-v1.p.rapidapi.com'

const instance = axios.create({
    baseURL: "https://apidojo-yahoo-finance-v1.p.rapidapi.com",
    headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': RAPID_API_HOST
    }
});

module.exports = instance;