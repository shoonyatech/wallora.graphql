import { ApolloServer } from "apollo-server";
import bookResolvers from "./resolvers/books.js";
import bookTypeDef from "./models/book.js";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const server = new ApolloServer({
  typeDefs: bookTypeDef,
  resolvers: bookResolvers,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
