import { baseService } from "./BaseService";
import { createQueryFromObject } from "../utils/queryBuilder";

export const getNews = (options = {}) => {
  const query = createQueryFromObject(options);
  const result = baseService.get(`news?${query}`);
  return result;
};
