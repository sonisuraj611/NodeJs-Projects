require('dotenv').config();
require('express-async-errors')

const express = require('express');
const app = express();

const connectDB = require('./db/connect')
const productRouter = require('./routes/products')

const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

app.use(express.json())


app.get('/',(req,res)=>{
    res.send("<h1>Store API</h1><a href='api/v1/products'>products route</a>");
})

app.use('/api/v1/products',productRouter)

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

const port = process.env.PORT || 3000
const start = async ()=>{
    try {
        //connect mongo
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server listening to port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start();