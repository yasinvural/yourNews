import axios from "axios";

class BaseService {
  constructor() {
    this.http = axios.create({
      baseURL: "https://ataknewsserver.herokuapp.com/api/"
    });

    // this.http.defaults.headers.common.Authorization = "Basic dXNlcjp1c2Vy";
  }

  async get(url) {
    return this.http.get(url);
  }

  async post(url, data, config) {
    return this.http.post(url, data, config);
  }

  async put(url, data, config) {
    return this.http.put(url, data, config);
  }

  async delete(url, config) {
    return this.http.delete(url, config);
  }
}

const baseService = new BaseService();

export { baseService };
