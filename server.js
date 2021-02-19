const next = require('next')
const express = require('express')



const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handler = app.getRequestHandler();

//router
const defaultRouter = require('./router/defaultRouter')



app.prepare().then(()=>{
    const server = express()

    server.use(express.json())

    //use router for /default
    server.use('/default',defaultRouter)



    server.get("*", (req, res) => {
        return handler(req, res)
    })

    server.listen(port, err => {
        if (err) throw err;
        console.log(`Listening on PORT ${port} => http://localhost:${port}`);
    });
})