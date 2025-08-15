import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';
import BookmarkForm from '../components/BookmarkForm';
import BookmarkList from '../components/BookmarkList';

const BookDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axiosInstance.get(`/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        alert('Failed to fetch book.');
        navigate('/books');
      }
    };

    const fetchBookmarks = async () => {
      if (user) {
        try {
          const response = await axiosInstance.get('/api/bookmarks', {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setBookmarks(response.data.filter((bookmark) => bookmark.book._id === id));
        } catch (error) {
          alert('Failed to fetch bookmarks.');
        }
      }
    };

    fetchBook();
    fetchBookmarks();
  }, [id, user, navigate]);

  if (!book) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <p className="text-lg mb-2">By {book.author}</p>
      <p className="text-sm text-gray-500 mb-4">Category: {book.category}</p>
      <div className="bg-gray-100 p-4 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-2">Read Book</h2>
        <p>{book.content.substring(0, 500)}...</p> {/* Simplified reader */}
        <div className="mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="mr-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Previous Page
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next Page
          </button>
        </div>
      </div>
      {user && (
        <>
          <BookmarkForm
            bookId={id}
            currentPage={currentPage}
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
          />
          <BookmarkList bookmarks={bookmarks} setBookmarks={setBookmarks} />
        </>
      )}
    </div>
  );
};

export default BookDetail;