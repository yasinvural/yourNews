import { baseService } from "./BaseService";
import {createQueryFromObject} from "../utils/queryBuilder";

export const likeNews = (reqObj) => {
  return baseService.post(`news-likes`, reqObj);
};

export const dislikeNews = (reqObj) => {
    const query = createQueryFromObject(reqObj);
    const url = `news-likes?${query}`;
    return baseService.delete(url);
};