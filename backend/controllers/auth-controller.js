const UserSchema = require('../models/user-model')
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const passport = require('passport')


const signupUser = async (req, res) => {
    const errors = validationResult(req);


    const { mail, password } = req.body

    if (!mail || !password )
        return res.status(400).send("Bad Request")    
    if(!errors.isEmpty())
        {
           console.log(errors)


            return res.status(400).json({error: errors.array()})   
        }

    UserSchema.findOne({ mail: mail }, async (err, user) => {
        if (err) {console.log(err); return res.status(400).send("some unexpected error occuered")}
        else if (user) return res.status(406).send("User already exists")
        else {
            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = new UserSchema({
                mail: mail,
                password: hashPassword,
                wallet: {
                    currency: "USD",
                    amount: 1304.9
                }
            })

            await newUser.save()
            return res.status(201).send("New user created")
        }
    })

}

const loginUser = (req, res, next) => {
    const errors = validationResult(req);
    const { username, password } = req.body
    
   
    if (!username || !password)
        return res.status(400).send("Bad Request");
    
    if(!errors.isEmpty())
    return res.status(400).send({error:errors.array()});
    passport.authenticate('local', (err, user, info) => {
       
      
        if (!user) res.status(403).send(err.msg && err.msg);
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.status(200).send("Successfully Authenticated");
                
            });
        }
    })(req, res, next);
}

const getUser = (req, res) => {

    if(req.user)
    res.json( {user:req.user})
    else res.status(404).send("No user logged")

}

const logout = (req, res) => {

    req.logOut();
    res.json("logged out")

}

exports.getUser = getUser;
exports.signupUser = signupUser;
exports.loginUser = loginUser;
exports.logout = logout;