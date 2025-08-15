import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const BookmarkForm = ({ bookId, currentPage, bookmarks, setBookmarks }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ page: currentPage, note: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        '/api/bookmarks',
        { bookId, page: formData.page, note: formData.note },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setBookmarks([...bookmarks, response.data]);
      setFormData({ page: currentPage, note: '' });
    } catch (error) {
      alert('Failed to add bookmark.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">Add Bookmark</h1>
      <input
        type="number"
        placeholder="Page"
        value={formData.page}
        onChange={(e) => setFormData({ ...formData, page: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        min="1"
      />
      <textarea
        placeholder="Note (optional)"
        value={formData.note}
        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        rows="3"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        Add Bookmark
      </button>
    </form>
  );
};

export default BookmarkForm;