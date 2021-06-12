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
    user: async (root, {}, { accessToken, dataSources }) => {
      const userSettings = await dataSources.walloraAPI.getUserSettings(
        accessToken
      );
      return { userSettings };
    },
  },
};

export { typeDef, userResolvers };
