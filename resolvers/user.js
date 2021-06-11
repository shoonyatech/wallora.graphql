const userResolvers = {
  Query: {
    user: async (root, {}, { dataSources }) => {
      const userSettings = await dataSources.walloraAPI.getUserSettings();
      return { userSettings };
    },
  },
};

export default userResolvers;
