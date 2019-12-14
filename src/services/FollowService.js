import { baseService } from "./BaseService";

export const followUser = username => {
  const result = baseService.post(`followers`, { followedUsername: username });
  return result;
};
