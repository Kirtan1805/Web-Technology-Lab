const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true // Useful for search
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        index: true // Useful for filtering
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    year: {
        type: Number,
        required: true
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
