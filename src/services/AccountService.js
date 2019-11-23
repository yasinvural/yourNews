import { baseService } from "./BaseService";

export const login = data => {
  return baseService.post("authenticate", data);
};

export const register = data => {
  return baseService.post("register", data);
};

export const changePassword = data => {
  return baseService.post("account/change-password", data);
};