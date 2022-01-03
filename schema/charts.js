import { gql } from "apollo-server";
import predictedSavings from "../dummy-data/predicted-savings.js";
import plannedExpenses from "../dummy-data/planned-expenses.js";

const typeDef = gql`
  extend type Query {
    charts: Charts
  }

  type Charts {
    banks: [TotalWorth]
    investments: [TotalInvestments]
    cashAtHome: TotalCashAtHome
    creditCards: [TotalCreditCards]
    loans: [TotalLoans]
    realEstate: TotalRealEstate
    fixedDeposits: TotalFixedDeposits
    goldAndPreciousMetals: TotalGoldAndPreciousMetals
    mutualFund: TotalMutualFund
    stocks: TotalStocks
    predictedSavings: [SavingsThisMonth]
    plannedExpenses: [WorkItemWiseSavings]
  }
  
  type TotalStocks {
    amount: Int
  }

  type TotalMutualFund {
    amount: Float
  }

  type TotalGoldAndPreciousMetals {
    amount: Float
  }

  type TotalFixedDeposits {
    amount: Float
  }

  type TotalRealEstate {
    amount: Float
  }

  type TotalLoans {
    name: String
    outstandingPrincipal: Float
    currency: String
  }

  type TotalCreditCards {
    availableCreditLimit: Float
    currency: String
    outstandingBalance: Float
    creditLimit: Float
  }

  type TotalCashAtHome {
    amount: Float
    date: String
    currency: String
  }

  type TotalInvestments {
    currentValue: Float
    currency: String
    investmentName: String
  }

  type TotalWorth {
    bankName: String
    balance: Float
    currency: String
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
    charts: async (root, {}, { v1AccessToken, v2AccessToken, dataSources }) => {
      const banks = await dataSources.walloraAPI.getBanks(
        v1AccessToken,
        v2AccessToken
      );
      const investments = await dataSources.walloraAPI.getInvestments(
        v1AccessToken,
        v2AccessToken
      );
      const cashAtHome = await dataSources.walloraAPI.getCashAtHome(
        v1AccessToken,
        v2AccessToken
      );
      const creditCards = await dataSources.walloraAPI.getCreditCards(
        v1AccessToken,
        v2AccessToken
      );
      const loans = await dataSources.walloraAPI.getLoans(
        v1AccessToken,
        v2AccessToken
      ); 
      const {realEstate, fixedDeposits, goldAndPreciousMetals, mutualFund, stocks} = 0;

      return { realEstate, fixedDeposits, goldAndPreciousMetals, mutualFund, stocks, banks, investments, cashAtHome, creditCards, loans, predictedSavings, plannedExpenses };
    },
    
  },
};

export { typeDef, chartsResolvers };
