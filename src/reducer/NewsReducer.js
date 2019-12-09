export const initialState = {
  loading: false,
  news: [],
  searchText: "",
  selectedCategory: "",
  tagNameList: [],
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
        news: [...action.payload]
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
    case "set_searchText":
      return {
        ...state,
        searchText: action.payload,
        pagination: {
          ...state.pagination,
          page: 0
        }
      };
    case "set_selectedCategory":
      return {
        ...state,
        selectedCategory: action.payload
      };
    case "set_tagNameList":
      return {
        ...state,
        tagNameList: action.payload
      };
    case "set_likeNews":
      const filteredLikeNews = state.news.map(_news => {
        if (_news.id === action.payload) {
          _news.likedByUser = true;
          _news.likesCount = _news.likesCount + 1;
        }
        return _news;
      });
      return {
        ...state,
        news: [...filteredLikeNews]
      };
    case "set_dislikeNews":
      const filteredDisLikeNews = state.news.map(_news => {
        if (_news.id === action.payload) {
          _news.likedByUser = false;
          _news.likesCount = _news.likesCount - 1;
        }
        return _news;
      });
      return {
        ...state,
        news: [...filteredDisLikeNews]
      };
    default:
      return state;
  }
};
