export const createQueryFromObject = reqObj => {
  let query = "";
  for (let key in reqObj) {
    if (key === "pagination") {
      const { page, size } = reqObj[key];
      query += `page=${page}&size=${size}&`;
    } else {
      query += `${key}=${reqObj[key]}&`;
    }
  }

  return query;
};
