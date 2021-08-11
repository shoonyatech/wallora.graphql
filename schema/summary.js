import { gql } from "apollo-server";

const typeDef = gql`
  
  type summary {
    summaryInfo: SummaryInfo
  }

  type SummaryInfo {
    currentMonth: [CurrentMonthBudgetSpent]
    plannedItems: [PlannedItemsDetail]
    actualItems: [ActualItemsDetail]
  }

  type CurrentMonthBudgetSpent {
    budget: Float
    spent: Float
  }

  type PlannedItemsDetail {
    date: String
    amount: Float
    comment: String
    tags: String
    contact: String
  }

  type ActualItemsDetail {
    date: String
    amount: Float
    comment: String
    tags: String
    contact: String
  }
  
  extend type Query {
    summary: Summary
  }
`;

const summaryResolvers = {
  Query: {
    summary: async (root, {}, { v1AccessToken, v2AccessToken, dataSources }) => {
      console.log(`v1 token:${v1AccessToken}, v2 token:${v2AccessToken}`)
      const summaryInfo = await dataSources.walloraAPI.getSummaryInfo(
        v1AccessToken,
        v2AccessToken
      )
      return {summaryInfo };
    },
  },
};

export { typeDef, summaryResolvers };