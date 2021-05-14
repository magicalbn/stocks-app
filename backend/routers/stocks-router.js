const express = require('express');

const stocksController = require('../controllers/stocks-controller')
const { body, validationResult } = require('express-validator');

let router = express.Router();


router.get('/search/:symbol',stocksController.searchStock)

router.get('/autocomplete/:symbol',stocksController.autoComplete)

router.get('/chart/:symbol',stocksController.getChart)

router.get('*',(req,res)=>{
    res.json({
        msg: "invalid path"
    })
})

module.exports = router