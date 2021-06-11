import { RESTDataSource } from "apollo-datasource-rest";

export class WalloraAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://www.wallora.com/api/";
  }

  async getUserSettings(accessToken) {
    return this.get("user-settings", null, {
      cacheOptions: { ttl: 60 },
      headers: {
        "X-Access-Token": accessToken,
      },
    });
  }
}
