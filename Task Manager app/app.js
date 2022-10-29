const express = require('express')
const app = express();
const port = process.env.PORT || 3000
const tasks = require('./routes/tasks')
const notFound = require('./middleware/not-found')
const connectDB = require('./db/connection');
const errorHandlerMiddleware = require('./middleware/error-handler')
require('dotenv').config()

//Middleware
app.use(express.static('./public'))
app.use(express.json())


//routes
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)


const start = async () => {
    try {
        connectDB(process.env.MONGO_URI)
        app.listen(port, () =>
            console.log('Listening to port 3000')
        )

    } catch (error) {
        console.log(error);
    }
}

start()

