const express = require('express');
const router = express.Router()
const {getNotes, addNotes, deleteNotes} = require('../controllers/notesController');
const { protect } = require('../middlewares/authMiddleware');

router.route("/").get(protect, getNotes).post(protect,addNotes)
router.delete("/:id", protect, deleteNotes )

module.exports = router