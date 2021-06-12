import predictedSavings from "../dummy-data/predicted-savings.js";

const chartsResolvers = {
  Query: {
    charts: () => ({ predictedSavings }),
  },
};

export default chartsResolvers;
