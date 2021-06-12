const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect("mongodb://localhost:27017/reactTodoDB", {useNewUrlParser: true, useUnifiedTopology: true});
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required to create a new note!"]
    },
    content: String
});

const Note = mongoose.model("Note", noteSchema);


app.route("/")

.get((req, res) => {
    Note.find
})

.post((req, res) => {

})

.delete((req, res) => {

});

app.listen(4000, () => {
    console.log("Server started at http://localhost:4000")
});
//epiphany