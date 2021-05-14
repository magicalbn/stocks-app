import axios from 'axios'

export const autoComplete = async (stockName) =>{
    const {data} = await axios.get(`/api/stocks/autocomplete/${stockName}`)
    return data
}


export const getStockDetails = async (stockName) =>{
    const {data} = await axios.get(`/api/stocks/search/${stockName}`)
    return data
}


export const getStockChart = async (stockName) =>{
    const {data} = await axios.get(`/api/stocks/chart/${stockName}`)
    return data
}