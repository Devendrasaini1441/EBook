import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const BookmarkList = ({ bookmarks, setBookmarks }) => {
  const { user } = useAuth();

  const handleDelete = async (bookmarkId) => {
    try {
      await axiosInstance.delete(`/api/bookmarks/${bookmarkId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBookmarks(bookmarks.filter((bookmark) => bookmark._id !== bookmarkId));
    } catch (error) {
      alert('Failed to delete bookmark.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Bookmarks</h2>
      {bookmarks.map((bookmark) => (
        <div key={bookmark._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <p>Page: {bookmark.page}</p>
          {bookmark.note && <p>Note: {bookmark.note}</p>}
          <p className="text-sm text-gray-500">
            Book: {bookmark.book.title}
          </p>
          <button
            onClick={() => handleDelete(bookmark._id)}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookmarkList;