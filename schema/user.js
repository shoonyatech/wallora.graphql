import { gql } from "apollo-server";

const typeDef = gql`
  extend type Query {
    user: User
  }

  type User {
    userSettings: UserSettings
    currencies: [Currency]
  }

  type UserSettings {
    currency: String
    accountId: String
  }

  type Currency {
    symbol: String 
    code: String 
    name: String
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
      const currencies = await dataSources.walloraAPI.getCurrencies(
        v1AccessToken,
        v2AccessToken
      );
      return { userSettings, currencies };
    },
  },
};

export { typeDef, userResolvers };