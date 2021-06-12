import { gql } from "apollo-server";

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

export { typeDef };
