import books from "../dummy-data/books.js";

const bookResolvers = {
  Query: {
    books: () => books,
  },
};

export default bookResolvers;
