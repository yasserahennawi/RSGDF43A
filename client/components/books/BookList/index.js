import React from 'react';
import { style } from 'glamor';

import Book from 'components/books/Book';

const BookList = ({ books }) => {
  return (
    <div className={`${bookContainer}`}>
      {books.map((book, key) => (
        <Book
          cover={book.coverImage}
          key={`${book.coverImage}-${key}`}
        >
          {book.children}
        </Book>
      ))}
    </div>
  );
};

const bookContainer = style({
  //marginTop: 50,
  marginBottom: 20,
  display: 'flex',
  flexWrap: 'wrap',
});

export default BookList;
