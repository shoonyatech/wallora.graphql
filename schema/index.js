import { gql } from "apollo-server";
import { typeDef as User, userResolvers } from "./user.js";
import { typeDef as Charts, chartsResolvers } from "./charts.js";

const root = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

const schemaArray = [root, User, Charts];
const resolvers = { ...userResolvers, ...chartsResolvers };

export { schemaArray, resolvers };
