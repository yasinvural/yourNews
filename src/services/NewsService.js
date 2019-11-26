import { baseService } from "./BaseService";

export const getNews = (options = {}) => {
  const { size, page  } = options.pagination;
  return baseService.get(`news?page=${page}&size=${size}`);
};
