export const initialState = {
  loading: false,
  news: [],
  pagination: {
    page: 0,
    size: 10
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "set_news":
      return {
        ...state,
        news: [...state.news, ...action.payload]
      };
    case "set_page":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.payload
        }
      };
    case "set_loading":
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};
