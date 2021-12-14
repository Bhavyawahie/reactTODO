const asyncHandler = require('express-async-handler')
const Note = require('../models/noteModel')
const {v4: uuidv4} = require('uuid')

// @desc:   Get all the notes of a user
// @route:  GET /api/notes/
// @access: Private

const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({user: req.user})
    res.status(200).json(notes)
})

// @desc:   Add a note to the user's collection of notes
// @route:  POST /api/notes/
// @access: Private

const addNotes = asyncHandler(async (req, res) => {
    const note = Note({
        id: uuidv4(),
        user: req.user._id,
        title: req.body.title,
        content: req.body.content
    })
    await note.save()
    res.status(201).json(note)
})

// @desc:   Delete notes from the user's collection of notes
// @route:  DELETE /api/notes/:id
// @access: Private

const deleteNotes = asyncHandler(async (req, res) => {
    const note = await Note.findOne({id: req.params.id, user: req.user})
    if(note) {
        await Note.findOneAndRemove({id: req.params.id})
        res.json('Note removed successfully!')
    }
    else {
        res.status(404).json('Message: Note not found!')
    }
})

// @desc:   Update notes from the user's collection of notes
// @route:  Put /api/notes/:id
// @access: Private

const editNotes = asyncHandler(async (req, res) => {
    const {title, content} = req.body
    const note = await Note.findOne({id: req.params.id, user: req.user})
    if(note) {
            note.title =  title || note.title
            note.content =  content || note.content
            await note.save()
            res.json('Note Updated Successfully!')
    }
    else {
        res.status(404).json('Message: Note not found!')
    }
})

module.exports = {
    getNotes,
    addNotes, 
    deleteNotes,
    editNotes
}