import { gql } from "apollo-server";
import expensetags from "../dummy-data/expense-tags.js";

const typeDef = gql`
  extend type Query {
    tags: [Tag]
  }

  type Tag {
    accountId: String
    name: String
  }
`;

const tagResolvers = {
  Query: {
    tags: (root, {}, { v1AccessToken, v2AccessToken, dataSources }) => {
      return { expensetags };
    },
  },
};

export { typeDef, tagResolvers };
