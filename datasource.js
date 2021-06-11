import { RESTDataSource } from "apollo-datasource-rest";

export class WalloraAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://www.wallora.com/api/";
  }

  async getUserSettings() {
    return this.get("user-settings", null, {
      cacheOptions: { ttl: 60 },
      headers: {
        "X-Access-Token":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imd1ZXN0QHdhbGxvcmEuY29tIiwidXNlcm5hbWUiOiJndWVzdEB3YWxsb3JhLmNvbSIsImZpcnN0TmFtZSI6Ikd1ZXN0IiwibGFzdE5hbWUiOiJVc2VyIiwiaWF0IjoxNjIzMzk2MjQwLCJleHAiOjE2MjM0ODI2NDB9.gjldHNXLoo9ORrhMihHT3Nu8vGSsRCb1IDb3A7E5JGQ",
      },
    });
  }
}
