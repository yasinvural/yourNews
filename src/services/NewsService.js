import { baseService } from "./BaseService";
import {createQueryFromObject} from "../utils/queryBuilder";

export const getNews = (options = {}) => {
  const query = createQueryFromObject(options);
  return baseService.get(`news?${query}`);
};
