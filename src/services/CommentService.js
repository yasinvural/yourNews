import { baseService } from "./BaseService";
import { createQueryFromObject } from "../utils/queryBuilder";

export const deleteNewsComment = id => {
  return baseService.delete(`news-comments/${id}`);
};

export const createNewsComment = data => {
  return baseService.post("comments", data);
};

export const getNewsComment = (options = {}) => {
  const query = createQueryFromObject(options);
  const result = baseService.get(`comments?${query}`);
  return result;
};
