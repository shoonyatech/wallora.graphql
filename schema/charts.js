import { gql } from "apollo-server";
import predictedSavings from "../dummy-data/predicted-savings.js";
import plannedExpenses from "../dummy-data/planned-expenses.js";
import myCurrentWorth from "../dummy-data/my-current-worth.js";

const typeDef = gql`
  extend type Query {
    charts: Charts
  }

  type Charts {
    myCurrentWorth: [TotalWorth]
    predictedSavings: [SavingsThisMonth]
    plannedExpenses: [WorkItemWiseSavings]
  }

  type TotalWorth {
    name: String
    amount: Float
  }

  type SavingsThisMonth {
    month: String
    savings: Money
  }

  type Money {
    currencyCode: String
    amount: Float
  }

  type WorkItemWiseSavings {
    name: String
    amount: Float
  }
`;

const chartsResolvers = {
  Query: {
    charts: (root, {}, { v1AccessToken, v2AccessToken, dataSources }) => {
      return { myCurrentWorth ,predictedSavings, plannedExpenses };
    },
    
  },
};

export { typeDef, chartsResolvers };
