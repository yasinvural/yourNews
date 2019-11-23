import axios from "axios";

class BaseService {
  constructor() {
    this.http = axios.create({
      baseURL: "https://ataknewsserver.herokuapp.com/api/"
    });

    this.http.interceptors.request.use(config => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.common.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.http.interceptors.response.use(
      success => {
        if (success.status === 200) {
          return success;
        }
      },
      error => {
        if (error.response.status === 401) {
          throw Error("UnAuthorized");
          // return history.push('/login',{
          //   title:'Unauthorized',
          //   description:'Please relogin'
          // });
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
