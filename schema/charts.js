import { gql } from "apollo-server";
import predictedSavings from "../dummy-data/predicted-savings.js";

const typeDef = gql`
  type Money {
    currencyCode: String
    amount: Float
  }

  type SavingsThisMonth {
    month: String
    savings: Money
  }

  type Charts {
    predictedSavings: [SavingsThisMonth]
  }

  extend type Query {
    charts: Charts
  }
`;

const chartsResolvers = {
  Query: {
    charts: () => ({ predictedSavings }),
  },
};

export { typeDef, chartsResolvers };
