import React, { useState, useEffect } from "react";

import axios from "axios";
import { useRouter } from "next/router";

import Layout from "../frontend/components/Layout";
import SearchStock from "../frontend/components/UI/StockSearch/StocksSearch";
import Homelist from "../frontend/components/StocksList/HomeList";
import Homestocks from "../frontend/components/HomeStocksChart/Homestocks";

import { userGetdetails } from "../frontend/lib/auth-lib";
import { getStocks } from "../frontend/lib/transact-lib";
import { getWatchlist } from "../frontend/lib/watchlist-lib";

const Home = () => {
    const router = useRouter();
    const [error, seterror] = useState(null);
    const [userStocks, setuserStocks] = useState([]);
    const [userWatchlist, setuserWatchlist] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [currentStockSymbol, setcurrentStockSymbol] = useState();

    useEffect(() => {
        userGetdetails()
            .then((user) => {
                if (!user.user) {
                    Router.replace("/");
                } else {
                    getStocks()
                        .then((stocks) => {
                            setuserStocks(stocks);
                            setisLoading(false);
                            if (stocks[0])
                                setcurrentStockSymbol(stocks[0].symbol);
                        })
                        .catch((err) => console.log("Error fetching stocks"));
                    getWatchlist()
                        .then((stocks) => {
                            setuserWatchlist(stocks);
                        })
                        .catch((err) =>
                            console.log("Error fetching watchlist")
                        );
                }
            })
            .catch((err) => router.replace("/"));
    }, []);

    const submitHandler = (searchValue) => {
        if (searchValue.trim() == "") {
            seterror("Empty Field not Allowed");
            return;
        } else if (error) {
            seterror(null);
        }

        router.push({
            pathname: "stocks",
            query: {
                symbol: searchValue,
            },
        });
    };

    const getuser = () => {
        axios
            .get("/api/auth/getuser")
            .then((user) => {})
            .catch((err) => console.log(err.response));
        getStocks()
            .then((user) => {})
            .catch((err) => console.log("Stocks Error", err.response));
    };

    const logout = () => {
        axios
            .get("/api/auth/logout")
            .then((user) => {})
            .catch((err) => console.log(err.response));
    };

    const onListClick = (value) => {
        setcurrentStockSymbol(value);
    };

    return (
        <Layout title="Home">
            <div className="container">
                <SearchStock submitHandler={submitHandler} error={error} />
                <div className="home-section">
                    <Homestocks currentStockSymbol={currentStockSymbol} />
                    <Homelist
                        isLoading={isLoading}
                        userStocks={userStocks}
                        userWatchlist={userWatchlist}
                        clickFunction={onListClick}
                    />
                </div>
                {
                    //<button onClick={getuser}>get user</button>
                    //<button onClick={logout}>logout</button>
                }
            </div>
        </Layout>
    );
};

export default Home;
