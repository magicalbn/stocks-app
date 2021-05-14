import React from 'react';

const Stocklist = (props) => {
    const { userStocks } = props
    console.log("inside Stocks", props.userStocks)
    return (
        <div className="stocks-list">
            <h2>Stocks</h2>

            {   
                
                userStocks? userStocks.map(each => {
                    return (
                        <div key={each._id}className="each-stock">
                            <div className="left">
                                <h3>{each.symbol}</h3>
                                <p>{each.count} shares</p>
                            </div>
                            <div className="right">
                                <p>Details</p>
                            </div>
                        </div>
                    )
                }): "Start Purchasing Stocks"
            }



        </div>
    )
}

export default Stocklist