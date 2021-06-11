import { ApolloServer } from "apollo-server";
import userResolvers from "./resolvers/user.js";
import { User } from "./schema.js";

const server = new ApolloServer({
  typeDefs: User,
  resolvers: userResolvers,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
