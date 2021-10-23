import { gql } from "apollo-server";

const typeDef = gql`

  type Finance {
    currentMonth: String
    incomeExpenseCategories: [incomeExpenseCategoriesWorkItems]
    actuals: actualsWorkItems
    plan: planMonths
  }

  type incomeExpenseCategoriesWorkItems {
    id: Int
    order: Int
    name: String
    incomeOrExpense: String
    currency: String
    plannedTotal: Int
    actualTotal: Int
  }

  type actualsWorkItems {
    dates: [actualsDates]
  }

  type actualsDates {
    date: String
    totalSpent: Int
    workItems: [actualsDatesWorkItems]
  }

  type actualsDatesWorkItems {
    id: Int
    incomeOrExpense: String
    category: String
    lineItems: [lineItemsWorkItems]
  }

  type lineItemsWorkItems {
    description: String
    currency: String
    amount: Int
    tags: [String]
  }

  type planMonths {
    months: [planMonthsWorkItems]
  }

  type planMonthsWorkItems {
    month: String
    workItems: [planMonthsWorkItemsWorkItems]
  }

  type planMonthsWorkItemsWorkItems {
    id: Int
    incomeOrExpense: String
    category: String
    lineItems: [planMonthsWorkItemsWorkItemsLineItems]
  }

  type planMonthsWorkItemsWorkItemsLineItems {
    description: String
    currency: String
    amount: Int
    tags: [String]
  }

  extend type Query {
    finance: Finance
    actualsDates(startDate: String!, endDate: String!): [actualsDates]
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
    actualsDates: async (root, args, { v1AccessToken, v2AccessToken, dataSources }) => {
      const workItems = await dataSources.walloraAPI.getActualsDatesWorkItems(
        v1AccessToken,
        v2AccessToken,
        args
        );
      let dates = [];
      workItems.map((item, index) => {
        if (index > 0 && item.date === workItems[index - 1].date) {
          dates[index - 1] = { date: item.date, totalSpent: workItems[index - 1].amount + item.amount };
        } else {
          dates.push({ date: item.date, totalSpent: item.amount });
        }
      });
      return dates;
    },
  }
};

export { typeDef, financeResolvers };