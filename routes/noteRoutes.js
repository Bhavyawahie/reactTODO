const express = require('express');
const router = express.Router()
const {getNotes, addNotes, deleteNotes, editNotes} = require('../controllers/notesController');
const { protect } = require('../middlewares/authMiddleware');

router.route("/").get(protect, getNotes).post(protect, addNotes)
router.route("/:id").put(protect, editNotes).delete( protect, deleteNotes )

module.exports = router