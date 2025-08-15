const Book = require('../models/Book');

// Get all books (public)
const getBooks = async (req, res) => {
    try {
        const { category } = req.query;
        const query = category ? { category } : {};
        const books = await Book.find(query);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get single book by ID (public)
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Create book (admin only, simplified for demo)
const createBook = async (req, res) => {
    try {
        const { title, author, category, content } = req.body;
        if (!title || !author || !category || !content) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const book = await Book.create({ title, author, category, content });
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update book (admin only)
const updateBook = async (req, res) => {
    try {
        const { title, author, category, content } = req.body;
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        book.title = title || book.title;
        book.author = author || book.author;
        book.category = category || book.category;
        book.content = content || book.content;
        const updatedBook = await book.save();
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete book (admin only)
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        await book.remove();
        res.status(200).json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getBooks, getBookById, createBook, updateBook, deleteBook };