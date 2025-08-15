const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true }, // Simplified content (e.g., text or URL to content)
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Book', bookSchema);