/* eslint-disable no-loop-func */
export const createQueryFromObject = reqObj => {
  let query = "";
  for (let key in reqObj) {
    if (key === "pagination") {
      const { page, size } = reqObj[key];
      query += `page=${page}&size=${size}&`;
    } else if (key === "tags") {
      reqObj[key].forEach(t => {
        query += `tag=${t}&`;
      });
    } else if(key === "categoryNames") {
      reqObj[key].forEach(c => {
        query += `categoryNames=${c}&`;
      });
    } else {
      query += `${key}=${reqObj[key]}&`;
    }
  }

  return query;
};
