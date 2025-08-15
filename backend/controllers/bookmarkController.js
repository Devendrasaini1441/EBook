const Bookmark = require('../models/Bookmark');

// Get all bookmarks for a user
const getBookmarks = async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({ user: req.user.id }).populate('book');
        res.status(200).json(bookmarks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Create bookmark
const createBookmark = async (req, res) => {
    try {
        const { bookId, page, note } = req.body;
        if (!bookId || !page) {
            return res.status(400).json({ message: 'Book ID and page are required' });
        }
        const bookmark = await Bookmark.create({
            user: req.user.id,
            book: bookId,
            page,
            note: note || '',
        });
        const populatedBookmark = await Bookmark.findById(bookmark._id).populate('book');
        res.status(201).json(populatedBookmark);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update bookmark
const updateBookmark = async (req, res) => {
    try {
        const { page, note } = req.body;
        const bookmark = await Bookmark.findById(req.params.id);
        if (!bookmark) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }
        if (bookmark.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        bookmark.page = page || bookmark.page;
        bookmark.note = note !== undefined ? note : bookmark.note;
        const updatedBookmark = await bookmark.save();
        const populatedBookmark = await Bookmark.findById(updatedBookmark._id).populate('book');
        res.status(200).json(populatedBookmark);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete bookmark
const deleteBookmark = async (req, res) => {
    try {
        const bookmark = await Bookmark.findById(req.params.id);
        if (!bookmark) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }
        if (bookmark.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        await bookmark.remove();
        res.status(200).json({ message: 'Bookmark deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getBookmarks, createBookmark, updateBookmark, deleteBookmark };