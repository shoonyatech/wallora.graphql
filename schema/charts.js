import { gql } from "apollo-server";
import predictedSavings from "../dummy-data/predicted-savings.js";
import plannedExpenses from "../dummy-data/planned-expenses.js";

const typeDef = gql`
  extend type Query {
    charts: Charts
  }

  type Charts {
    predictedSavings: [SavingsThisMonth]
    plannedExpenses: [WorkItemWiseSavings]
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
      return { predictedSavings, plannedExpenses };
    },
  },
};

export { typeDef, chartsResolvers };
