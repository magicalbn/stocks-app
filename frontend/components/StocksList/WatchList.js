import React from 'react';

const Watchlist = (props) =>{
    
    const {userWatchlist} = props;
   

    return(
        <div className="watch-list">
            <h2>WatchList</h2>
            {
                (userWatchlist && userWatchlist.length>0)?userWatchlist.map(each=>{
                    return(
                        <div key={each} className="each-stock">
                            <div className="left">
                                <h3>{each}</h3>
                            </div>
                            <div className="right"><p>Details</p></div>
                            
                        </div>
                    )
                }):<p className="empty">Start adding to WatchList . .</p>
            }
        </div>
    )
}

export default Watchlist