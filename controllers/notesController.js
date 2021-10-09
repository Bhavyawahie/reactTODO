const asyncHandler = require('express-async-handler')
const Note = require('../models/noteModel')
const {v4: uuidv4} = require('uuid')

// @desc:   Get all the notes of a user
// @route:  GET /api/notes/
// @access: Private

const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({})
    res.status(200).json(notes)
})

// @desc:   Add a note to the user's collection of notes
// @route:  POST /api/notes/
// @access: Private

const addNotes = asyncHandler(async (req, res) => {
    const note = Note({
        id: uuidv4(),
        title: req.body.title,
        content: req.body.content
    })
    await note.save()
    res.status(201).json('Note added successfully!')
})

// @desc:   Delete notes from the user's collection of notes
// @route:  DELETE /api/notes/:id
// @access: Private

const deleteNotes = asyncHandler(async (req, res) => {
    const note = await Note.find({id: req.params.id})
    if(note) {
        await Note.findOneAndRemove({id: req.params.id})
        res.json('Note removed successfully!')
    }
    else {
        res.status(404).json('Message: Note not found!')
    }
})

module.exports = {
    getNotes,
    addNotes, 
    deleteNotes
}