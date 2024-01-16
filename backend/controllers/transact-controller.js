const UserSchema = require("../models/user-model");

const { body, validationResult } = require("express-validator");

const getStocks = (req, res) => {
    if (req.user) {
        UserSchema.findOne({ _id: req.user.id }, async (err, user) => {
            if (err) {
                res.json(err);
            }
            res.json(user.stocks);
        });
    } else res.status(401).send("No user logged");
};

const buyStocks = async (req, res) => {
    let user;

    try {
        user = await UserSchema.findById(req.user.id);
    } catch {
        return res.status(401).send("No User Login");
    }

    const { symbol, count } = req.body;
    if (!symbol || !count) {
        res.status(400).send("Bad Request No Params");
    }

    let ownedStocks = [...user.stocks];

    let previousStock = {};
    previousStock = ownedStocks.find((each) => each.symbol == symbol);
    // ownedStocks.map(each => {
    //     if(each.symbol==symbol){
    //         previousStock = each
    //     }
    // })

    if (previousStock) {
        previousStock.count = parseInt(count) + parseInt(previousStock.count);
    } else {
        const newItem = {
            symbol: symbol,
            count: count,
        };
        ownedStocks = [...ownedStocks, newItem];
    }

    user.stocks = ownedStocks;
    try {
        await user.save();
        res.json(`${symbol} Stocks Purchased`);
    } catch {
        return res.status(500).send("Some Error Occured");
    }
};

const sellStocks = async (req, res) => {
    let user;

    try {
        user = await UserSchema.findById(req.user.id);
    } catch (err) {
        return res.status(401).send("No User Login");
    }

    const { symbol, count } = req.body;

    if (!symbol || !count) {
        res.status(400).send("Bad Request No Params");
    }
    let ownedStocks = [...user.stocks];

    let previousStock;

    previousStock = ownedStocks.find(
        (each) => each.symbol == symbol && parseInt(each.count) != 0
    );

    if (previousStock) {
        if (parseInt(previousStock.count) < parseInt(count)) {
            return res.status(400).send("User owns less than sell count");
        }
        let newCountValue = parseInt(previousStock.count) - parseInt(count);
        if (newCountValue == 0) {
            ownedStocks = ownedStocks.filter((each) => each.symbol != symbol);
        } else previousStock.count = newCountValue;
    } else {
        return res.status(400).send("User does not own this stock");
    }

    user.stocks = ownedStocks;
    try {
        await user.save();
        res.json(`${symbol} Stocks Sold`);
    } catch (err) {
        res.status(500).send("Some Error Occured");
    }
};

exports.getStocks = getStocks;
exports.buyStocks = buyStocks;
exports.sellStocks = sellStocks;
