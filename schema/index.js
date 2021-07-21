import { gql } from "apollo-server";
import { typeDef as User, userResolvers } from "./user.js";
import { typeDef as Charts, chartsResolvers } from "./charts.js";
import { typeDef as Finance, financeResolvers } from "./finance.js";
import { typeDef as Tags, tagResolvers } from "./tags.js";

const root = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

const schemaArray = [root, User, Charts, Finance, Tags];
const resolvers = [
  userResolvers,
  chartsResolvers,
  financeResolvers,
  tagResolvers,
];

export { schemaArray, resolvers };
