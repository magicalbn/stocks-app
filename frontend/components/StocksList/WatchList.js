import React from 'react';
import {useRouter} from 'next/router'

const Watchlist = (props) =>{
    
    const {userWatchlist,onListClick} = props;
    const router = useRouter()

    const onDetailsClick = (value) =>{
        router.push({
            pathname: "stocks",
            query: {
                symbol: value
            }
        })
    }

    return(
        <div className="watch-list">
            <h2>WatchList</h2>
            {
                (userWatchlist && userWatchlist.length>0)?userWatchlist.map(each=>{
                    return(
                        <div key={each} className="each-stock" >
                            <div className="left" onClick={()=>onListClick(each)}>
                                <h3>{each}</h3>
                            </div>
                            <div className="right" onClick={()=>onDetailsClick(each)}><p>Details</p></div>
                            
                        </div>
                    )
                }):<p className="empty">Start adding to WatchList . .</p>
            }
        </div>
    )
}

export default Watchlist