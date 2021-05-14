import React from 'react';

const Watchlist = (props) =>{
    
    const {userWatchlist} = props;
    console.log(userWatchlist)

    return(
        <div className="watch-list">
            <h2>WatchList</h2>
            {
                userWatchlist?userWatchlist.map(each=>{
                    return(
                        <div key={each} className="each-stock">
                            <div className="left">
                                <h3>{each}</h3>
                            </div>
                            <div className="right"><p>Details</p></div>
                            
                        </div>
                    )
                }):"Start adding to WatchList"
            }
        </div>
    )
}

export default Watchlist