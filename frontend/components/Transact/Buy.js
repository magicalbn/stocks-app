import React, { useState, useEffect } from 'react';

import { useToasts } from 'react-toast-notifications'
import { buyStocks, sellStocks, getStocks } from '../../lib/transact-lib'


const Buy = (props) => {
    const { details, isPurcahsing } = props;
    const [stocksCount, setstocksCount] = useState(1)
    const [currentCount, setcurrentCount] = useState('NA')
    const { addToast } = useToasts()

    let button
    let type
    if (isPurcahsing) {
        type = 'Buy'
        button = <button onClick={() => transactBuy()}>Buy Shares</button>
    } else {
        type = 'Sell'
        button = <button disabled={currentCount < stocksCount} onClick={() => transactSell()}>Sell Shares</button>
    }

    useEffect(() => {
        getStockCount();

    }, [])



    const { symbol, price } = details
    const estPrice = stocksCount * price.value


    const getStockCount = () => {
        getStocks().then(stocks => {
            console.log(stocks)
            let current = stocks.find(each => each.symbol == symbol)
            if (current) {
                setcurrentCount(current.count)
            } else {
                setcurrentCount(0)
            }
        })
            .catch(err => console.log(err.response))
    }

    const transactBuy = () => {
        const data = {
            symbol: symbol,
            count: stocksCount
        }
        buyStocks(data).then(res => {
            console.log(res)
            addToast(res, {
                appearance: 'success',
                autoDismiss: true,
            })
            getStockCount();
            setstocksCount(1);

        })
            .catch(err => {
                console.log(err.response)
                addToast(err.response.data, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            })
    }

    const transactSell = () => {
        const data = {
            symbol: symbol,
            count: stocksCount
        }
        sellStocks(data).then(res => {
            console.log(res)
            addToast(res, {
                appearance: 'success',
                autoDismiss: true,
            })
            getStockCount();
            setstocksCount(1);
        })
            .catch(err => {
                console.log(err.response)
                addToast(err.response.data, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            })
    }



    return (
        <div className="transact-details">
            <h3>{type} {symbol}</h3>
            <div className="current-shares"><span>Currenct Shares</span><p>{currentCount}</p></div>
            <div className="buy-shares"><span>{type} Shares</span><input min="1" max="1000" value={stocksCount} onChange={(event) => setstocksCount(event.target.value)} type="number"></input></div>
            <div className="market-price"><span>Market Price</span><p>{price.value} {price.currencySymbol}</p></div>
            <div className="estimated-price"><span>Estimated Price</span><p>{estPrice.toFixed(2)} {price.currencySymbol}</p></div>
            {button}
            <p>Funds $12312</p>
        </div>

    )
}

export default Buy;