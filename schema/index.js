import { gql } from "apollo-server";
import { typeDef as User } from "./user.js";
import { typeDef as Charts } from "./charts.js";

const root = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

const schemaArray = [root, User, Charts];

export default schemaArray;
