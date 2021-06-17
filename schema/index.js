import { gql } from "apollo-server";
import { typeDef as User, userResolvers } from "./user.js";
import { typeDef as Charts, chartsResolvers } from "./charts.js";
import { typeDef as Finance, financeResolvers } from "./finance.js";

const root = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

const schemaArray = [root, User, Charts,Finance];
const resolvers = [userResolvers, chartsResolvers,financeResolvers];

export { schemaArray, resolvers };
