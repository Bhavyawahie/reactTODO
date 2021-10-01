const express = require('express');
const Note = require('../models/noteModel');
const router = express.Router()
const {v4: uuidv4} = require('uuid')

router.get("/notes",(req, res) => {
    Note.find({}, (err, foundNotes) => {
        if(!err){
            res.status(200).json(foundNotes);
        }
        else{
            console.error(err);
        }
    })
})

router.post("/notes/:id", (req, res) => {
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

router.delete("/notes/:id", async (req, res) => {
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

module.exports = router