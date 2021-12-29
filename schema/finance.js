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
    id: String
    order: Int
    name: String
    incomeOrExpense: String
    currency: String
    plannedTotal: Int
    actualTotal: Int
    balanceTotal: Float
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
    incomeExpenseCategoriesWorkItems: [incomeExpenseCategoriesWorkItems]
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
    incomeExpenseCategoriesWorkItems: async (root, { }, { v1AccessToken, v2AccessToken, dataSources }) => {
      const plannedWorkItmes = await dataSources.walloraAPI.getPlannedWorkItems(v1AccessToken, v2AccessToken);
      const actualWorkItems = await dataSources.walloraAPI.getActualsWorkItems(v1AccessToken, v2AccessToken);
      const massagedActualWorkItems = _.map(actualWorkItems, (actualWorkItem) => {
        return {
          id: actualWorkItem.workitemId,
          totalActualAmount: actualWorkItem.totalActualAmount
        }
      });
      // merge planned and actual work items
      var indexed = _.indexBy(massagedActualWorkItems, 'id');
      const workItems = _.map(plannedWorkItmes, function(obj) {
        var master = indexed[obj.workitem.id];
        return _.extend({}, master, obj);
      });
      const masaged = [];
      
      workItems.map((item, index) => {
        masaged.push({
          id: item.workitem.id,
          order: item.workitem.order,
          name: item.workitem.name,
          incomeOrExpense: item.workitem.incomeOrExpense,
          currency: 'INR',
          plannedTotal: item.totalPlannedAmount,
          actualTotal: item.totalActualAmount,
          balanceTotal: (item.totalPlannedAmount && item.totalActualAmount) ? ((item.totalActualAmount / item.totalPlannedAmount) * 100).toFixed(2) : 0
        });
      });
      return _.sortBy(masaged, function(o) { return o.order; })
    },
  }
};

export { typeDef, financeResolvers };