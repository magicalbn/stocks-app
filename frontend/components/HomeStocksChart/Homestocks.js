import React, {useState,useEffect} from 'react';
import { getStockDetails, getStockChart } from '../../lib/stocks-lib'

import Chart from '../Stocks/Chart'


const Homestocks = (props) =>{
    
    const {currentStockSymbol} = props
    const [chartTimestamp, setchartTimestamp] = useState([])
    const [chartStockvalue, setchartStockvalue] = useState([])
    const [stockDetails, setstockDetails] = useState({})

    useEffect(() => {
        if(currentStockSymbol){
            getStockDetails(currentStockSymbol).then(response => {
    
                setstockDetails(response)
            }).catch(err => {console.log(err.response && err.response.data)})
    
            getStockChart(currentStockSymbol).then(response => {
    
                setchartStockvalue(response.value)
                setchartTimestamp(response.timestamp)
            }).catch(err => console.log(err.response && err.response.data))
        }
    }, [currentStockSymbol])

    let content = (stockDetails.symbol && chartStockvalue.length)?<Chart chartTimestamp={chartTimestamp} chartStockvalue={chartStockvalue} title={(stockDetails.longName) || (stockDetails.shortName) || " "} price={stockDetails.price} />:"Loading . ."

    return (
        <div className="home-chart">
            { currentStockSymbol?content:"Start Purchasing Stocks Now!"}
        </div>
    )
}

export default Homestocks