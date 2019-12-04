import { baseService } from "./BaseService";

export const likeDislikeNews = (reqObj) => {
  return baseService.post(`like-dislike`, reqObj);
};