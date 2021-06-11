import userSettings from "../dummy-data/user-settings.js";

const userResolvers = {
  Query: {
    user: () => ({ userSettings }),
  },
};

export default userResolvers;
