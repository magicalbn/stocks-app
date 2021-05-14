const express = require('express');

const authController = require('../controllers/auth-controller')
const { body, validationResult } = require('express-validator');

let router = express.Router();


router.post('/signup'
,body("mail").isEmail().withMessage('Invalid format')
,body("password").isLength({min:6}).withMessage('Too short')
, authController.signupUser)

router.post('/login',body("username").isEmail().withMessage('Invalid format'),authController.loginUser)

router.get('/getuser',authController.getUser)

router.get('/logout',authController.logout)

router.get('*',(req,res)=>{
    res.json({
        msg: "invalid path"
    })
})


module.exports = router