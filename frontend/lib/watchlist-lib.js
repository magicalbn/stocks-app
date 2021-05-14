import axios from 'axios'

export const getWatchlist = async() =>{
    const {data} = await axios.get('/api/watch/user')
    return data
}

export const addtoWatchlist = async(body) =>{
    const {data} = await axios.post('/api/watch/add',body)
    return data
}

export const removefromWatchlist = async(body) =>{
    const {data} = await axios.post('/api/watch/remove',body)
    return data
}

