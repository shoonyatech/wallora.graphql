import { gql } from "apollo-server";

const typeDef = gql`
  
  type Finance {
    workItems: [WorkItems]
  }

  type WorkItems {
    accountId: String
    id: String
    incomeOrExpense: String
    name: String
    order: Int 
  }
  
  extend type Query {
    finance: Finance
  }
`;

const financeResolvers = {
  Query: {
    finance: async (root, {}, { v1AccessToken, v2AccessToken, dataSources }) => {
      console.log(`v1 token:${v1AccessToken}, v2 token:${v2AccessToken}`)
      const workItems = await dataSources.walloraAPI.getWorkItems(
        v1AccessToken,
        v2AccessToken
      )
      return {workItems };
    },
  },
};

export { typeDef, financeResolvers };