import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Layout from '../frontend/components/Layout'
import StockSearch from '../frontend/components/UI/StockSearch/StocksSearch'
import { getStockDetails, getStockChart } from '../frontend/lib/stocks-lib'

import Details from '../frontend/components/Stocks/Details'
import Chart from '../frontend/components/Stocks/Chart'
import TransactCard from '../frontend/components/Transact/TransactCard'
import { userGetdetails } from '../frontend/lib/auth-lib'
import Spinner from '../frontend/components/UI/Spinner'

const Stocks = (props) => {

    const { symbol } = props
    const [stockSymbol, setstockSymbol] = useState(symbol || "")
    const [chartTimestamp, setchartTimestamp] = useState([])
    const [chartStockvalue, setchartStockvalue] = useState([])
    const [stockDetails, setstockDetails] = useState({})

    const [error, seterror] = useState(null)

    useEffect(() => {

        userGetdetails().then(user => {
            if (!user.user) {
                Router.replace('/')
                return
            } else populate();
        }).catch(err => router.replace("/"))



    }, [symbol])

    const populate = () => {
        if (symbol) {
            seterror(null)
            getStockDetails(symbol).then(response => {

                setstockDetails(response)
            }).catch(err => {seterror("No Data Found");console.log(err.response && err.response.data)})

            getStockChart(symbol).then(response => {

                setchartStockvalue(response.value)
                setchartTimestamp(response.timestamp)
            }
            ).catch(err => console.log(err.response && err.response.data))
        }
    }

    const router = useRouter()

    const submitHandler = (searchValue) => {
        if (searchValue.trim() == "") {
            seterror('Empty Field not Allowed')
            return
        } else if (error) {
            seterror(null)
        }
        setchartTimestamp([])
        setchartTimestamp([])
        setstockDetails({})

        router.replace({

            query: {
                symbol: searchValue
            }
        })
    }

    let content = error?null:(
        symbol ? (stockDetails.symbol && chartStockvalue.length ? (<><Chart chartTimestamp={chartTimestamp} chartStockvalue={chartStockvalue} title={(stockDetails.longName) || (stockDetails.shortName) || " "} price={stockDetails.price} /> <TransactCard details={stockDetails}/> </>): <Spinner/>) : <p>Start Searching for Stocks . .</p>
    )



    return (
        <Layout title={(symbol || "") + " Stocks"}>
            <div className="container">
                <div className="stocks-search">
                    <StockSearch initialValue={symbol} error={error} submitHandler={submitHandler} />
                    <div className="interact">
                    {content}

                    </div>
                    {stockDetails.symbol && stockDetails.summaryProfile ? <Details stockDetails={stockDetails} /> : null}
                    <div className="transact"></div>
                </div>
            </div>
        </Layout>
    )
}

Stocks.getInitialProps = ({ query }) => {
    const symbol = query.symbol
    return { symbol }
}

export default Stocks