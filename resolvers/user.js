const userResolvers = {
  Query: {
    user: async (root, {}, { accessToken, dataSources }) => {
      const userSettings = await dataSources.walloraAPI.getUserSettings(
        accessToken
      );
      return { userSettings };
    },
  },
};

export default userResolvers;
