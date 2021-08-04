import { gql } from "apollo-server";
import predictedSavings from "../dummy-data/predicted-savings.js";
import plannedExpenses from "../dummy-data/planned-expenses.js";
import currentMonth from "../dummy-data/current-month.js";
import plannedItems from "../dummy-data/planned-items.js";
import actualItems from "../dummy-data/actual-items.js";

const typeDef = gql`
  extend type Query {
    charts: Charts
  }

  type Charts {
    predictedSavings: [SavingsThisMonth]
    plannedExpenses: [WorkItemWiseSavings]
    currentMonth: [CurrentMonthBudgetSpent]
    plannedItems: [PlannedItemsDetail]
    actualItems: [ActualItemsDetail]
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
`;

const chartsResolvers = {
  Query: {
    charts: (root, {}, { v1AccessToken, v2AccessToken, dataSources }) => {
      return { predictedSavings, plannedExpenses, currentMonth, plannedItems, actualItems };
    },
  },
};

export { typeDef, chartsResolvers };
