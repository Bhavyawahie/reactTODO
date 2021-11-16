const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    id: String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    } ,
    title: {
        type: String,
    },
    content: String
});

const Note = mongoose.model('Note', noteSchema)
module.exports = Note