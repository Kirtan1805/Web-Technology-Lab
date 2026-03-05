const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

// To format created_date dynamically, we can use a virtual or just format on the frontend.
// Frontend implementation usually formats Date strings easily.

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
