import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  private books = [
    {
      id: 1,
      name: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'FICTION',
    },
    {
      id: 2,
      name: '1984',
      author: 'George Orwell',
      genre: 'DYSTOPIAN',
    },
    {
      id: 3,
      name: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'CLASSIC',
    },
    {
      id: 4,
      name: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      genre: 'FANTASY',
    },
    {
      id: 5,
      name: 'Sapiens: A Brief History of Humankind',
      author: 'Yuval Noah Harari',
      genre: 'NON_FICTION',
    },
  ];

  findAll(
    genre?: 'FICTION' | 'NON_FICTION' | 'FANTASY' | 'CLASSIC' | 'DYSTOPIAN',
  ) {
    if (genre) {
      console.log(this.books);
      return this.books.filter((book) => book.genre === genre);
    }
    return this.books;
  }

  findOne(id: number) {
    const book = this.books.find((book) => book.id === id);

    return book;
  }

  create(book: {
    name: string;
    author: string;
    genre: 'FICTION' | 'NON_FICTION' | 'FANTASY' | 'CLASSIC' | 'DYSTOPIAN';
  }) {
    const bookByHighestId = [...this.books].sort((a, b) => b.id - a.id);
    const newBook = {
      id: bookByHighestId[0].id + 1,
      ...book,
    };
    this.books.push(newBook);
    return newBook;
  }

  update(
    id: number,
    updateBook: {
      name: string;
      author: string;
      genre: 'FICTION' | 'NON_FICTION' | 'FANTASY' | 'CLASSIC' | 'DYSTOPIAN';
    },
  ) {
    this.books = this.books.map((book) => {
      if (book.id === id) {
        return {
          ...book,
          ...updateBook,
        };
      }
      return book;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedBook = this.findOne(id);
    this.books = this.books.filter((book) => book.id !== id);

    return removedBook;
  }
}
