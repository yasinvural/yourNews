import axios from "axios";
import userManager from "../utils/userManager";

class BaseService {
  constructor() {
    this.http = axios.create({
      baseURL: "https://corrnews.herokuapp.com/api/"
    });

    this.http.interceptors.request.use(config => {
      const token = userManager.getItem("token");
      if (token) {
        config.headers.common.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.http.interceptors.response.use(
      success => {
        if (success.status === 200 || success.status === 201) {
          if (success.headers["x-total-count"]) {
            return {
              data: success.data.data,
              totalCount: success.headers["x-total-count"]
            };
          } else {
            return success.data;
          }
        }
      },
      error => {
        if (error.response.status === 400) {
          throw Error("Bad Request");
        }
        if (error.response.status === 401) {
          userManager.removeItem("token");
          userManager.removeItem("user");
          throw Error("UnAuthorized");
        }
        if (error.response.status === 404) {
          throw Error("Not Found");
        }
      }
    );
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
