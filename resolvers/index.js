import userResolvers from "./user.js";
import chartsResolvers from "./charts.js";

const resolvers = { ...userResolvers, ...chartsResolvers };

export default resolvers;
