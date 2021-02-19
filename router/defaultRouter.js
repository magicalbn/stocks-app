const express = require('express');
const { json, response } = require('express');

let router = express.Router();


router.get('/', (req, res) => {
    res.json({msg:"working"})
})


module.exports = router