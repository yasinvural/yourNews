import { baseService } from "./BaseService";
import { createQueryFromObject } from "../utils/queryBuilder";

export const getNews = (options = {}) => {
  const query = createQueryFromObject(options);
  const result = baseService.get(`news?${query}`);
  return result;
};

export const getNewsById = id => {
  const result = baseService.get(`news/${id}`);
  return result;
};
