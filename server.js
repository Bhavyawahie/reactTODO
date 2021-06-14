const express = require('express');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuidv4');
const app = express();

mongoose.connect("mongodb://localhost:27017/reactTodoDB", {useNewUrlParser: true, useUnifiedTopology: true});

const noteSchema = new mongoose.Schema({
    id: String
    title: {
        type: String,
        required: [true, "Title is required to create a new note!"]
    },
    content: String
});

const Note = mongoose.model("Note", noteSchema);


app.route("/")

    .get((req, res) => {
        Note.find({}, (err, foundNotes) => {
            if(!err){
                res.status(200).json(foundNotes);
            }
            else{
                console.error(err);
            }
        });
    })

    .post((req, res) => {
        const newNote = Note({
            id: uuidv4();
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

    .delete((req, res) => {
        const id = req.body.id
        Note.deleteOne({id: req.body.id}, (err) => {
            if(err){
                console.error(err);
            }
            else{
                res.send("Article Deleted Successfully!");
            }
        });
    });

app.listen(4000, () => {
    console.log("Server started at http://localhost:4000")
});
//epiphany