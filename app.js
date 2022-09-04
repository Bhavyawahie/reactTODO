const express = require('express')
const cors = require('cors')
const path = require("path")
const app = express()
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')


const connectDb = require('./config/db')
const noteRoutes = require('./routes/noteRoutes')
const userRoutes = require('./routes/userRoutes')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')


dotenv.config({ path: './.env'})


connectDb()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

if(process.env.NODE_ENV === "production" ){
    app.get("/", (req, res) => {
        res.send("API working")
    })
}

app.use("/api/notes", noteRoutes)
app.use("/api/users", userRoutes)
app.use(notFound)
app.use(errorHandler)


module.exports = app
