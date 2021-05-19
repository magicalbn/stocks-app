import React, { useState, useEffect } from 'react';

import Spinner from '../UI/Spinner'
import { useToasts } from 'react-toast-notifications'
import { buyStocks, sellStocks, getStocks } from '../../lib/transact-lib'


const Buy = (props) => {
    const { details, isPurcahsing } = props;
    const [stocksCount, setstocksCount] = useState(1)
    const [currentCount, setcurrentCount] = useState('NA')
    const [isLoading,setisLoading] = useState(false)
    const { addToast } = useToasts()

    let button
    let type
    if (isPurcahsing) {
        type = 'Buy'
        button = <button disabled={isLoading} onClick={() => transactBuy()}>{ isLoading?<Spinner/>: "Buy Shares"}</button>
    } else {
        type = 'Sell'
        button = <button disabled={(currentCount < stocksCount)||isLoading} onClick={() => transactSell()}>{isLoading?<Spinner/>: "Sell Shares"}</button>
    }

    useEffect(() => {
        getStockCount();

    }, [])



    const { symbol, price } = details
    const estPrice = stocksCount * price.value


    const getStockCount = () => {
        getStocks().then(stocks => {
            
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
        setisLoading(true)
        const data = {
            symbol: symbol,
            count: stocksCount
        }
        buyStocks(data).then(res => {
            
            addToast(res, {
                appearance: 'success',
                autoDismiss: true,
            })
            getStockCount();
            setstocksCount(1);
            setisLoading(false)

        })
            .catch(err => {
                console.log(err.response)
                addToast(err.response.data, {
                    appearance: 'error',
                    autoDismiss: true,
                })
                setisLoading(false)
            })
    }

    const transactSell = () => {
        setisLoading(true)
        const data = {
            symbol: symbol,
            count: stocksCount
        }
        sellStocks(data).then(res => {
            
            addToast(res, {
                appearance: 'success',
                autoDismiss: true,
            })
            getStockCount();
            setstocksCount(1);
            setisLoading(false)
        })
            .catch(err => {
                console.log(err.response)
                addToast(err.response.data, {
                    appearance: 'error',
                    autoDismiss: true,
                })
                setisLoading(false)
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