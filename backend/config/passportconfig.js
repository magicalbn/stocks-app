
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user-model')

module.exports = function (passport) {


    passport.use(new localStrategy((username, password, done) => {

        User.findOne({ mail: username }, (err, user) => {
            if (err) { return done(err); }
            if (!user) { return done({msg:"User Not Found"}, false); }
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) throw err;
                if (result === true) return done(null, user)
                else return done({msg:"Invalid Credentials"}, false)
            })
        });
    }
    ));

    passport.serializeUser((user, cb) => {

        cb(null, user.id)

    });

    passport.deserializeUser((id, cb) => {

        User.findOne({ _id: id }, (err, user) => {
            const userData = {
                id: user._id,
                mail: user.mail,
                stocks: user.stocks,
                watchlist : user.watchlist
            }
            cb(err, userData)
        })
    })
}