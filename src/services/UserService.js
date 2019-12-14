import { baseService } from "./BaseService";

export const getUser = user => {
  const result = baseService.get(`users/${user}`);
  return result;
};
