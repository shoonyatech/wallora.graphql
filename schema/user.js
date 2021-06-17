import { gql } from "apollo-server";

const typeDef = gql`
  type UserSettings {
    currency: String
    accountId: String
  }
  
  type totalAmount {
    type: String 
    amount: Float
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
      console.log(`v1 token:${v1AccessToken}, v2 token:${v2AccessToken}`)
      const userSettings = await dataSources.walloraAPI.getUserSettings(
        v1AccessToken,
        v2AccessToken
      );
      return { userSettings };
    },
  },
};

export { typeDef, userResolvers };