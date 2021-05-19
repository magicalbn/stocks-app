import React from 'react';
import Spinner from '../UI/Spinner';
import {useRouter} from 'next/router'

const Stocklist = (props) => {
    const { userStocks, isLoading, onListClick } = props
    const router = useRouter()

    const onDetailsClick = (value) =>{
        router.push({
            pathname: "stocks",
            query: {
                symbol: value
            }
        })
    }
    
    const content = (
        (userStocks && userStocks.length>0)? userStocks.map(each => {
            return (
                <div key={each._id} className="each-stock">
                    <div className="left" onClick={()=>onListClick(each.symbol)}>
                        <h3>{each.symbol}</h3>
                        <p>{each.count} shares</p>
                    </div>
                    <div className="right" onClick={()=>onDetailsClick(each.symbol)}>
                        <p>Details</p>
                    </div>
                </div>
            )
        }):<p className="empty">Start purchasing Stocks . .</p>
    )
    
    return (
        <div className="stocks-list">
            <h2>Stocks</h2>

            {   
                isLoading?<Spinner/>:content
                
            }



        </div>
    )
}

export default Stocklist