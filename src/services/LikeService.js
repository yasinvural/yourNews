import { baseService } from "./BaseService";

export const likeNews = (reqObj) => {
  return baseService.post(`news-likes`, reqObj);
};

export const dislikeNews = ({newsId,userId}) => {
    const url = `news-likes?newsId=${newsId}&userId=${userId}`;
    return baseService.delete(url);
};