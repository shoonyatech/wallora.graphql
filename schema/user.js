import { gql } from "apollo-server";

const typeDef = gql`
  type UserSettings {
    currency: String
    accountId: String
  }

  type User {
    userSettings: UserSettings
  }

  extend type Query {
    user: User
  }
`;

const userResolvers = {
  Query: {
    user: async (root, {}, { v1AccessToken, v2AccessToken, dataSources }) => {
      const userSettings = await dataSources.walloraAPI.getUserSettings(
        v1AccessToken,
        v2AccessToken
      );
      return { userSettings };
    },
  },
};

export { typeDef, userResolvers };
