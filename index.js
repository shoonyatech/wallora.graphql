import { ApolloServer } from "apollo-server";
import resolvers from "./resolvers/index.js";
import schemaArray from "./schema/index.js";
import { WalloraAPI } from "./datasource.js";

const server = new ApolloServer({
  typeDefs: schemaArray,
  resolvers: resolvers,
  dataSources: () => ({
    walloraAPI: new WalloraAPI(),
  }),
  context: ({ req }) => ({
    accessToken: req.headers["x-access-token"],
  }),
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
