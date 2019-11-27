import { baseService } from "./BaseService";

export const getCategories = () => {
  return baseService.get(`categories`);
};
