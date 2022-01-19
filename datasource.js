import { RESTDataSource } from "apollo-datasource-rest";

export class WalloraAPI extends RESTDataSource {

  getHeaders(v1AccessToken, v2AccessToken) {
    return  { 
      "x-access-token": v1AccessToken,
      authorization: `Bearer ${v2AccessToken}`,
    }
  }

  constructor() {
    super();
    this.baseURL = "https://wallora-api.herokuapp.com/api/";
  }

  async getUserSettings(v1AccessToken, v2AccessToken) {
    return this.get("user-settings", null, {
      cacheOptions: { ttl: 60 },
      headers: this.getHeaders(v1AccessToken, v2AccessToken),
    });
  }  
  async getWorkItems(v1AccessToken,v2AccessToken) {
    return this.get("workitems",null, { headers: this.getHeaders(v1AccessToken, v2AccessToken) })
  }
  async getCurrencies(v1AccessToken,v2AccessToken) {
    return this.get("currencies",null, { headers: this.getHeaders(v1AccessToken, v2AccessToken) })
  }
  async getActualsDatesWorkItems(v1AccessToken,v2AccessToken,dates) {
    return this.get(`workitem-instances?startdate=${dates.startDate}&enddate=${dates.endDate}&populate=0`, null, { 
      headers: this.getHeaders(v1AccessToken, v2AccessToken),
    });
  }
  async getActualMonthsWorkItems(v1AccessToken,v2AccessToken,months) {
    return this.get(`workitem-plans?startmonth=${months.startMonth}&endmonth=${months.endMonth}&populate=0`, null, { 
      headers: this.getHeaders(v1AccessToken, v2AccessToken),
    });
  }
  async getBanks(v1AccessToken,v2AccessToken) {
    return this.get("banks",null, { headers: this.getHeaders(v1AccessToken, v2AccessToken) })
  }
  async getInvestments(v1AccessToken,v2AccessToken) {
    return this.get("investments",null, { headers: this.getHeaders(v1AccessToken, v2AccessToken) })
  }
  async getCashAtHome(v1AccessToken,v2AccessToken) {
    return this.get("cash-at-home",null, { headers: this.getHeaders(v1AccessToken, v2AccessToken) })
  }
  async getCreditCards(v1AccessToken,v2AccessToken) {
    return this.get("credit-cards",null, { headers: this.getHeaders(v1AccessToken, v2AccessToken) })
  }
  async getLoans(v1AccessToken,v2AccessToken) {
    return this.get("loans",null, { headers: this.getHeaders(v1AccessToken, v2AccessToken) })
  }
  async getTotalMonthsAmount(v1AccessToken,v2AccessToken,months) {
    return this.get(`stats/total-planned-amount-monthwise?startmonth=${months.startMonth}&endmonth=${months.endMonth}`, null, {
      headers: this.getHeaders(v1AccessToken, v2AccessToken) 
    })
  }
}
