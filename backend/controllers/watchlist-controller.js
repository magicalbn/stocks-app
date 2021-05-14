const UserSchema = require('../models/user-model')

const { body, validationResult } = require('express-validator');





const getWatchlist = (req, res) => {

    if (req.user) {
        UserSchema.findOne({ _id: req.user.id }, async (err, user) => {
            if (err) {
                res.json(err)
            }
            res.json(user.watchlist)
        })

    }
    else res.status(401).send("No User Login")


}

const removefromWatchlist = async (req, res) => {
    let user;

    try {
        user = await UserSchema.findById(req.user.id)

    } catch (err) {
        return res.status(401).send('No User Login')
    }

    
    const { symbol } = req.body
    if (!symbol)
        return res.status(400).send('Bad Request No Params')

    let currentList = [...user.watchlist]
    console.log("Initial",currentList)
    let stockSymbol = currentList.find(each => each == symbol)

    if (!stockSymbol) {
        return res.status(400).send('Not Present in Watchlist')
    }
    currentList = currentList.filter(each => each!=symbol)

    user.watchlist = currentList
    
    console.log("Final",user.watchlist)
    try{
        await user.save()
        return res.json(`${symbol} removed from WatchList`)
    }catch (err){
        return res.status(500).json("Some Error Occured")
    }




}

const addtoWatchlist = async (req, res) => {
    let user;

    try {
        user = await UserSchema.findById(req.user.id)

    } catch (err) {
        return res.status(401).send('No User Login')
    }

    
    const { symbol } = req.body
    if (!symbol)
        return res.status(400).send('Bad Request No Params')

    let currentList = [...user.watchlist]
    console.log("Initial",currentList)
    let stockSymbol = currentList.find(each => each == symbol)

    if (stockSymbol) {
        return res.status(400).send('Already added to WatchList')
    }
    currentList = [
        ...currentList, symbol
    ]

    user.watchlist = currentList
    
    console.log("Final",user.watchlist)
    try{
        await user.save()
        return res.json(`${symbol} added to WatchList`)
    }catch (err){
        return res.status(500).json("Some Error Occured")
    }




}




exports.getWatchlist = getWatchlist;
exports.addtoWatchlist = addtoWatchlist;
exports.removefromWatchlist = removefromWatchlist;
