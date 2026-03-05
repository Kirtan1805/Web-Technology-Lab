require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Book');

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/student_notes_db'; // Reusing same DB for simplicity

const booksData = [
    { title: "JavaScript Essentials", author: "John Smith", category: "Programming", price: 450, rating: 4.5, year: 2023 },
    { title: "MongoDB in Action", author: "Kyle Banker", category: "Database", price: 600, rating: 4.8, year: 2021 },
    { title: "Learning React", author: "Alex Banks", category: "Programming", price: 500, rating: 4.2, year: 2020 },
    { title: "Database Systems", author: "Ramez Elmasri", category: "Database", price: 750, rating: 3.9, year: 2019 },
    { title: "Advanced Node.js", author: "Samer Buna", category: "Programming", price: 550, rating: 4.6, year: 2022 },
    { title: "Python for Data Science", author: "Ethan Williams", category: "Data Science", price: 800, rating: 4.7, year: 2023 },
    { title: "Clean Code", author: "Robert C. Martin", category: "Programming", price: 650, rating: 4.9, year: 2008 },
    { title: "The Pragmatic Programmer", author: "Andrew Hunt", category: "Programming", price: 700, rating: 4.8, year: 1999 },
    { title: "SQL Antipatterns", author: "Bill Karwin", category: "Database", price: 520, rating: 4.1, year: 2010 },
    { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", category: "Database", price: 850, rating: 4.9, year: 2017 },
    { title: "JavaScript: The Good Parts", author: "Douglas Crockford", category: "Programming", price: 400, rating: 4.0, year: 2008 },
    { title: "Eloquent JavaScript", author: "Marijn Haverbeke", category: "Programming", price: 480, rating: 4.3, year: 2018 }
];

async function seedBooks() {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected for seeding books...');

        // Clear existing books
        await Book.deleteMany({});
        console.log('Cleared existing books collection.');

        // Insert mock data
        await Book.insertMany(booksData);
        console.log('Inserted mock books successfully.');

        mongoose.connection.close();
        console.log('Connection closed.');
    } catch (error) {
        console.error('Error seeding books:', error);
        process.exit(1);
    }
}

seedBooks();
