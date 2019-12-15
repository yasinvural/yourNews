import { baseService } from "./BaseService";

export const followUser = username => {
  const result = baseService.post(`followers`, { followedUsername: username });
  return result;
};

export const followedUser = username => {
  const result = baseService.get(`followers/${username}`);
  return result;
};

export const unFollowUser = username => {
  const result = baseService.delete(`followers/${username}`);
  return result;
};
