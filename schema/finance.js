import { gql } from "apollo-server";
import _ from 'underscore';

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
      // console.dir(workItems);
      return { workItems };
    },
    actualsDates: async (root, args, { v1AccessToken, v2AccessToken, dataSources }) => {
      const workItems = await dataSources.walloraAPI.getActualsDatesWorkItems(
        v1AccessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imd1ZXN0QHdhbGxvcmEuY29tIiwidXNlcm5hbWUiOiJndWVzdEB3YWxsb3JhLmNvbSIsImZpcnN0TmFtZSI6Ikd1ZXN0IiwibGFzdE5hbWUiOiJVc2VyIiwiaWF0IjoxNjQwNTk1MjQ3LCJleHAiOjE2NDA2ODE2NDd9.j3xKjU8JwXRBZ-xMrrAZNBA3xi8JD3sOI79JBtLebJ4",
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
            v1AccessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imd1ZXN0QHdhbGxvcmEuY29tIiwidXNlcm5hbWUiOiJndWVzdEB3YWxsb3JhLmNvbSIsImZpcnN0TmFtZSI6Ikd1ZXN0IiwibGFzdE5hbWUiOiJVc2VyIiwiaWF0IjoxNjQwNzc0MDIyLCJleHAiOjE2NDA4NjA0MjJ9.hIqyaurImqFF-sF85zu7ChYlqLUCDqkJt9TD3ocp38Y",
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