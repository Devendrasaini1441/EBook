import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const BookList = ({ books, setBooks, setEditingBook }) => {
  const { user } = useAuth();

  const handleDelete = async (bookId) => {
    try {
      await axiosInstance.delete(`/api/books/${bookId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBooks(books.filter((book) => book._id !== bookId));
    } catch (error) {
      alert('Failed to delete book.');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <div key={book._id} className="bg-gray-100 p-4 rounded shadow">
          <h2 className="font-bold text-lg">{book.title}</h2>
          <p>By {book.author}</p>
          <p className="text-sm text-gray-500">Category: {book.category}</p>
          <div className="mt-2">
            <Link
              to={`/books/${book._id}`}
              className="mr-2 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Read
            </Link>
            {user && (
              <>
                <button
                  onClick={() => setEditingBook(book)}
                  className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;