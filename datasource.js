import { RESTDataSource } from "apollo-datasource-rest";

export class WalloraAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://wallora-api.herokuapp.com/api/";
  }

  async getUserSettings(v1AccessToken, v2AccessToken) {
    return this.get("user-settings", null, {
      cacheOptions: { ttl: 60 },
      headers: {
        "x-access-token": v1AccessToken,
        authorization: `Bearer ${v2AccessToken}`,
      },
    });
  }
}
