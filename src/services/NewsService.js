import { baseService } from "./BaseService";

export const getNews = () => {
  return baseService.get("news");
};
