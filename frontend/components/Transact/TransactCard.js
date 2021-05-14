import React, { useState } from 'react';
import Buy from './Buy'
import Watch from './Watch'

const TransactCard = (props) => {

    const [transactBuy, settransactBuy] = useState(true);
    return (
        <div className="right-collection">
            <div className="transact-card">
                <div className="transact-type">
                    <p className={"transact-buy" + (transactBuy ? " active" : "")} onClick={() => settransactBuy(true)}>Buy</p>
                    <p className={"transact-sell" + (!transactBuy ? " active" : "")} onClick={() => settransactBuy(false)}>Sell</p>
                </div>
                <Buy details={props.details} isPurcahsing={transactBuy} />

            </div>
            <Watch symbol={props.details.symbol}/>
        </div>
    )
}

export default TransactCard;