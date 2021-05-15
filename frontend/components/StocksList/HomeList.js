import React from 'react';
import Stockslist from './StocksList' 
import Watchlist from './WatchList' 

const Homelist = (props) =>{
    
    return(
        <div className="home-list">
            <Stockslist isLoading={props.isLoading} userStocks={props.userStocks}/>
            <Watchlist userWatchlist={props.userWatchlist}/>
        </div>
    )
}

export default Homelist