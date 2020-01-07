import { baseService } from "./BaseService";

export const deleteNewsComment = id => {
  return baseService.delete(`news-comments/${id}`);
};

export const createNewsComment = data => {
  return baseService.post("comments", data);
};
