import { baseService } from "./BaseService";

export const deleteNewsComment = (id) => {
  return baseService.delete(`news-comments/${id}`);
};
