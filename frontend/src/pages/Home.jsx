import React from 'react';

const Home = () => {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://unsplash.com/photos/shallow-focus-photography-of-stack-of-books-zvKx6ixUhWQ)',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Welcome to E-Book Reader</h1>
        <p className="text-lg md:text-xl max-w-2xl text-center">
          Discover a world of knowledge with our digital library. Browse, read, and bookmark your favorite books across various categories.
        </p>
        <a
          href="/books"
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Explore Books
        </a>
      </div>
    </div>
  );
};

export default Home;