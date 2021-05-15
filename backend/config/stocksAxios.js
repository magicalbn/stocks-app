

const axios = require('axios');

const RAPID_API_KEY = 'ece2094fc2msh25a46e0ecb546c9p144d89jsn039f9fd30406'
const RAPID_API_HOST ='apidojo-yahoo-finance-v1.p.rapidapi.com'

const instance = axios.create({
    baseURL: "https://apidojo-yahoo-finance-v1.p.rapidapi.com",
    headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': RAPID_API_HOST
    }
});

module.exports = instance;