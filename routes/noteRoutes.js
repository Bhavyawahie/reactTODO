const express = require('express');
const router = express.Router()
const {getNotes, addNotes, deleteNotes} = require('../controllers/notesController')

router.get("/", getNotes).post("/", addNotes)
router.delete("/:id", deleteNotes )

module.exports = router