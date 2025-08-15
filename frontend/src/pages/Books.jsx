import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import { useAuth } from '../context/AuthContext';

const Books = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get(`/api/books${category ? `?category=${category}` : ''}`);
        setBooks(response.data);
      } catch (error) {
        alert('Failed to fetch books.');
      }
    };

    fetchBooks();
  }, [category]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">E-Book Reader</h1>
      <div className="mb-4">
        <label className="mr-2">Filter by Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
        </select>
      </div>
      {user && (
        <BookForm
          books={books}
          setBooks={setBooks}
          editingBook={editingBook}
          setEditingBook={setEditingBook}
        />
      )}
      <BookList books={books} setBooks={setBooks} setEditingBook={setEditingBook} />
    </div>
  );
};

export default Books;