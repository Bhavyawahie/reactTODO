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

if(process.env.NODE_ENV === 'production'){
    app.use(morgan('dev'))
}

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

if(process.env.NODE_ENV === "production" ){
    app.use(express.static(path.join(__dirname, '/client/build')))
    app.get("/note", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

app.use("/api/notes", noteRoutes)
app.use("/api/users", userRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Backend Server started running in ${process.env.NODE_ENV} at http://localhost:4000`.yellow.inverse)
});

// const testNote = new Note({
//     id: uuidv4(),
//     title:"my todo list",
//     content:"This is the content of my list"
// });
// testNote.save();

