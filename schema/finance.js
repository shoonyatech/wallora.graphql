import { gql } from "apollo-server";
import _ from 'underscore';

const typeDef = gql`

  type Finance {
    currentMonth: String
    incomeExpenseCategories: [incomeExpenseCategoriesWorkItems]
    actuals: actualsWorkItems
    plan: planMonths
  }

  type TotalMonthsAmount {
    month: String
    totalPlannedExpenses: Int
    totalPlannedIncome: Int
  }

  type getMonthlyData {
    month: Int
    amount: Int
  }

  type getWorklyData {
    incomeOrExpense: String
    name: String
    totalPlannedAmount: Int
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

  type actualMonths{
    month: String
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
    incomeExpenseCategoriesWorkItems: [incomeExpenseCategoriesWorkItems]
    actualMonths(startMonth: String!, endMonth: String!): [actualMonths]
    totalMonthsAmount(startMonth: String!, endMonth: String!): [TotalMonthsAmount]
    monthlyData(startMonth: String!, endMonth: String!): [getMonthlyData]
    worklyData(startMonth: String!, endMonth: String!): [getWorklyData]
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
        return { workItems };
      },
    actualsDates: async (root, args, { v1AccessToken, v2AccessToken, dataSources }) => {
      const workItems = await dataSources.walloraAPI.getActualsDatesWorkItems(
        v1AccessToken,
        v2AccessToken,
        args
        );
        const groups = _.groupBy(workItems, 'date');
        const dates = _.map(groups, (value, key) => {
          return { 
            date: key, 
            totalSpent: _.reduce(value, (total, o) => { 
                return total + o.amount;
            }, 0) 
          };
        });
        return dates;
      },
      actualMonths: async (root, args, { v1AccessToken, v2AccessToken, dataSources }) => {
        const workItems2 = await dataSources.walloraAPI.getActualMonthsWorkItems(
            v1AccessToken,
            v2AccessToken,
            args
          );
        const groups2 = _.groupBy(workItems2, 'month');
        const months = _.map(groups2, (value, key) => {
          return {
            month: key,
          };
        });
        return months ;
    },
    totalMonthsAmount: async (root, args, { v1AccessToken, v2AccessToken, dataSources }) => {
      const workItems = await dataSources.walloraAPI.getTotalMonthsAmount(
        v1AccessToken,
        v2AccessToken,
        args
        );
        const groups = _.groupBy(workItems, 'month');
        const months = _.map(groups, (value, key) => {
          return {
            month: key,
            totalPlannedExpenses: _.reduce(value, (total, o) => {
              return total + o.totalPlannedExpenses;
            }, 0),
            totalPlannedIncome: _.reduce(value, (total, o) => {
              return total + o.totalPlannedIncome;
            }, 0),
          };
        });
        return months;
      },
      monthlyData: async (root, args, { v1AccessToken, v2AccessToken, dataSources }) => {
        const workItems = await dataSources.walloraAPI.getMonthlyData(
          v1AccessToken,
          v2AccessToken,
          args
          );
          let months = [];
          workItems.map((item, index) => {
            if(index === 0) {
              months[index] = {
                month: item.month,
                amount: item.amount
              }
            } else {
                months.push({
                  month: item.month,
                  amount: item.amount
                })
              }
          });
          return months;
      },
      worklyData: async (root, args, { v1AccessToken, v2AccessToken, dataSources }) => {
        const workItems = await dataSources.walloraAPI.getWorklyData(
          v1AccessToken,
          v2AccessToken,
          args
          );
          let months = [];
          workItems.map((item, index) => {
            months.push({
              incomeOrExpense: item.workitem.incomeOrExpense,
              name: item.workitem.name,
              totalPlannedAmount: item.totalPlannedAmount
            })
          });
          return months;
      },
    incomeExpenseCategoriesWorkItems: async (root, { }, { v1AccessToken, v2AccessToken, dataSources }) => {
      const workItems = await dataSources.walloraAPI.getWorkItems(
        v1AccessToken,
        v2AccessToken
      )
      const masaged = [];
      workItems.map((item, index) => {
        masaged.push({
          id: index,
          order: item.order,
          name: item.name,
          incomeOrExpense: item.incomeOrExpense,
          currency: 'INR',
          plannedTotal: 1000,
          actualTotal: 1000
        });
      });
      return masaged;
    },
  }
};

export { typeDef, financeResolvers };