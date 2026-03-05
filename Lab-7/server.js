require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Note = require('./models/Note');
const Book = require('./models/Book');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/student_notes_db';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes

// 1. Add Note (Create)
app.post('/notes', async (req, res) => {
    try {
        const { title, subject, description } = req.body;

        // Create new note
        const newNote = new Note({
            title,
            subject,
            description
        });

        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create note', message: err.message });
    }
});

// 2. View Notes (Read)
app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find().sort({ created_date: -1 }); // Sort by newest first
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch notes', message: err.message });
    }
});

// 3. Update Note (Update)
app.put('/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        // Update basic fields. Note we aren't necessarily updating subject per requirements, 
        // but the API is flexible to accept what is provided in the $set object.
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { $set: { title, description } },
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json(updatedNote);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update note', message: err.message });
    }
});

// 4. Delete Note (Delete)
app.delete('/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully', id });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete note', message: err.message });
    }
});

// --- Book Finder API Routes ---

// 1. Search Books by Title
app.get('/books/search', async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({ error: 'Title query parameter is required' });
        }
        // Using regex for case-insensitive partial match
        const books = await Book.find({ title: { $regex: title, $options: 'i' } });
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: 'Failed to search books', message: err.message });
    }
});

// 2. Filter Books by Category
app.get('/books/category/:category', async (req, res) => {
    try {
        // Exact match for category (case-insensitive done via regex for friendliness)
        const category = new RegExp(`^${req.params.category}$`, 'i');
        const books = await Book.find({ category: category });
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: 'Failed to filter books', message: err.message });
    }
});

// 3. Sort Books (By price or rating)
app.get('/books/sort/:field', async (req, res) => {
    try {
        const { field } = req.params;
        let sortQuery = {};

        // Determine sort direction based on field (price ascending, rating descending per requirements)
        if (field === 'price') {
            sortQuery = { price: 1 };
        } else if (field === 'rating') {
            sortQuery = { rating: -1 };
        } else {
            return res.status(400).json({ error: 'Invalid sort field. Use "price" or "rating".' });
        }

        const books = await Book.find().sort(sortQuery);
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: 'Failed to sort books', message: err.message });
    }
});

// 4. Display Top Rated Books
app.get('/books/top', async (req, res) => {
    try {
        const topBooks = await Book.find({ rating: { $gte: 4 } }).limit(5).sort({ rating: -1 });
        res.status(200).json(topBooks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch top books', message: err.message });
    }
});

// 5. Pagination (Load More / View all paged)
// This also serves as the default endpoint to view all books
app.get('/books', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5; // Default limit 5 as per PDF
        const skip = (page - 1) * limit;

        const books = await Book.find().skip(skip).limit(limit);

        // Optional: Add total count so frontend knows when to stop paginating
        const total = await Book.countDocuments();

        res.status(200).json({
            data: books,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch books', message: err.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
