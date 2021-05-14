const express = require('express');

const watchlistController = require('../controllers/watchlist-controller')
const { body, validationResult } = require('express-validator');

let router = express.Router();


router.get('/user',watchlistController.getWatchlist)

router.post('/add',watchlistController.addtoWatchlist)

router.post('/remove',watchlistController.removefromWatchlist)

router.get('*',(req,res)=>{
    res.json({
        msg: "invalid path"
    })
})

module.exports = router