import { baseService } from "./BaseService";

export const loginUser = data => {
  return baseService.post("authenticate", data);
};

export const registerUser = data => {
  return baseService.post("register", data);
};

export const changePassword = data => {
  return baseService.post("account/change-password", data);
};