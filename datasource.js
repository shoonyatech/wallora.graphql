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
  /**
   * Get planned amount for Income and Expense Categories 
   * @param v1AccessToken 
   * @param v2AccessToken 
   * @param dates { startMonth: String, endMonth: String }
   * @returns workItems for Income and Expense Categories
   */
  async getPlannedWorkItems(v1AccessToken,v2AccessToken, month) {
    console.log('Access Token1:', v1AccessToken);
    console.log('Access Token2:', v2AccessToken);
    return this.get(`stats/total-planned-amount-workitemwise?startmonth=202112&endmonth=202112`, null, { 
      headers: this.getHeaders(v1AccessToken, v2AccessToken) 
    });
  }
  /**
   * Get actual amount for Income and Expense Categories 
   * @param v1AccessToken 
   * @param v2AccessToken 
   * @param dates { startMonth: String, endMonth: String }
   * @returns workItems for Income and Expense Categories
   */
  async getActualsWorkItems(v1AccessToken,v2AccessToken) {
    return this.get(`stats/total-actual-amount-workitemwise?startdate=20211201&enddate=20211231`, null, { 
      headers: this.getHeaders(v1AccessToken, v2AccessToken) 
    });
  }
}
