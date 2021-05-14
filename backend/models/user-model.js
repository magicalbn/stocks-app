const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    mail: { type: String, required: true },
    password: { type: String, required: true },
    watchlist: [{ type: String } ],
    stocks: [
        {
            symbol: { type: String },
            count: { type: Number }
        }
    ],
    wallet: {
        currency: { type: String },
        amount: { type: Number }
    }
})

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema)