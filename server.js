const next = require("next");
const express = require("express");
const mongoose = require("mongoose");
/* const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser') */
const passport = require("passport");

const session = require("express-session");
//const MongoDBStore = require('connect-mongodb-session')(session);
var MongoStore = require("connect-mongo");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const app = next({ dev });
const handler = app.getRequestHandler();

/* const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
    collection: 'mySessions'
});

store.on('error', function (error) {
    console.log(error);
}); */

//router
const authRouter = require("./backend/routers/auth-router");
const stocksRouter = require("./backend/routers/stocks-router");
const transactRouter = require("./backend/routers/transact-router");
const watchlistRouter = require("./backend/routers/watchlist-router");

//===========================================MongoDB Connection=============================================================

mongoose
    .connect(encodeURI(process.env.MONGODB_URL))
    .then(() => console.log("***Connection to MongoDB successful***"))
    .catch((err) => console.log("***Connection to MongoDB failed***", err));
//================================================================================================================================

app.prepare().then(() => {
    const server = express();
    server.use(express.json());

    server.use(
        session({
            secret: "secretCode",
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({
                mongoUrl: process.env.MONGODB_URL,

                collectionName: "sessions",
            }),

            //   store:store
            /* store: new RedisStore(
            {
                host: '127.0.0.1',       //where redis store is
                port: 6379,              //default redis port
                prefix: 'sess',          //prefix for sessions name is store
                pass: 'passwordtoredis'  //password to redis db
            }
        ),
        secret: 'cookiesecret',        //cookie secret
        key: 'express.sid',
        resave: false,
        saveUninitialized: false, */
        })
    );

    // server.use(cookieParser("secretCode"))
    server.use(passport.initialize());
    server.use(passport.session());
    require("./backend/config/passportconfig")(passport);

    //use router for /api
    server.use("/api/auth", authRouter);
    server.use("/api/stocks", stocksRouter);
    server.use("/api/transact", transactRouter);
    server.use("/api/watch", watchlistRouter);

    server.get("*", (req, res) => {
        return handler(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`Listening on PORT ${port} => http://localhost:${port}`);
    });
});
