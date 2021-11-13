import React, {useState,useEffect} from 'react';
import { getStockDetails, getStockChart } from '../../lib/stocks-lib'
import Spinner from '../UI/Spinner2'
import Advert from '../UI/Advert'
import Chart from '../Stocks/Chart'


const Homestocks = (props) =>{
    
    const {currentStockSymbol} = props
    const [chartTimestamp, setchartTimestamp] = useState([])
    const [chartStockvalue, setchartStockvalue] = useState([])
    const [stockDetails, setstockDetails] = useState({})
    const [isLoading, setisLoading] = useState(false)

    useEffect(() => {
        
        if(currentStockSymbol){
            setisLoading(true)
            getStockDetails(currentStockSymbol).then(response => {
    
                setstockDetails(response)
                setisLoading(false)
            }).catch(err => {  setisLoading(false); console.log(err.response && err.response.data)})
    
            getStockChart(currentStockSymbol).then(response => {
    
                setchartStockvalue(response.value)
                setchartTimestamp(response.timestamp)
                setisLoading(false)
            }).catch(err => {setisLoading(false) ;console.log(err.response && err.response.data)})
        }
    }, [currentStockSymbol])

    let content = (!isLoading && stockDetails.symbol && chartStockvalue.length)?<Chart chartTimestamp={chartTimestamp} chartStockvalue={chartStockvalue} title={(stockDetails.longName) || (stockDetails.shortName) || " "} price={stockDetails.price} />:<Spinner/>

    return (
        <div className="home-chart">
            { (currentStockSymbol || isLoading)?content:<Advert/>}
        </div>
    )
}

export default Homestocks