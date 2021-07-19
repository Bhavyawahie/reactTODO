const express = require('express');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const path = require("path")
const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect("mongodb+srv://bhavyawahie:Dl8c@c1978@cluster0.khotx.mongodb.net/reactTodoDB?retryWrites=true/reactTodoDB", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const noteSchema = new mongoose.Schema({
    id: String,
    title: {
        type: String,
        required: [true, "Title is required to create a new note!"]
    },
    content: String
});

const Note = mongoose.model("Note", noteSchema);

// const testNote = new Note({
//     id: uuidv4(),
//     title:"my todo list",
//     content:"This is the content of my list"
// });
// testNote.save();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

if(process.env.NODE_ENV === "production" ){
    app.use(express.static("client/build"))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}


    app.get("/notes",(req, res) => {
        Note.find({}, (err, foundNotes) => {
            if(!err){
                res.status(200).json(foundNotes);
                //export 
            }
            else{
                console.error(err);
            }
        });
    })

    app.post("/notes/:id", (req, res) => {
        const newNote = Note({
            id: uuidv4(),
            title: req.body.title,
            content: req.body.content
        });
        newNote.save((err) => {
            if(err){
                console.error(err);
            }
            else{
                res.send("Note added successfully!");
            }
        });

    })

    app.delete("/notes/:id", async (req, res) => {
        const id = req.params.id
        try {
            await Note.findOneAndRemove( {id: id}, (err) => {
            if(err){
                console.error(err);
            }
            else{
                res.send("Article Deleted Successfully!");
            }
        });
    }
    catch(err){
        if (err) throw err;
    }
    });

app.listen(PORT, () => {
    console.log("Server started at http://localhost:4000")
});
//epiphany

