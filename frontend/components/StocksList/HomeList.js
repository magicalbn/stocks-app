import React from 'react';
import Stockslist from './StocksList' 
import Watchlist from './WatchList' 

const Homelist = (props) =>{
    
    return(
        <div className="home-list">
            <Stockslist isLoading={props.isLoading} userStocks={props.userStocks} onListClick={props.clickFunction}/>
            <Watchlist userWatchlist={props.userWatchlist} onListClick={props.clickFunction}/>
        </div>
    )
}

export default Homelist