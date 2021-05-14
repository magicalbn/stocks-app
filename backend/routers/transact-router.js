const express = require('express');

const transactController = require('../controllers/transact-controller')
const { body, validationResult } = require('express-validator');

let router = express.Router();


router.get('/user/getstocks',transactController.getStocks)

router.post('/stocks/buy',transactController.buyStocks)

 router.post('/stocks/sell',transactController.sellStocks)

router.get('*',(req,res)=>{
    res.json({
        msg: "invalid path"
    })
})

module.exports = router