export const initialState = {
  loading: false,
  news: [],
  searchText: "56",
  selectedCategories: [],
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
    case "set_selectedCategories":
      return {
        ...state,
        selectedCategories: action.payload
      };
    case "set_tagNameList":
      return {
        ...state,
        tagNameList: action.payload
      };
    case "set_likeNews":
      const filteredLikeNews = state.news.map(_news => {
        if (_news.id === action.payload) {
          _news.isLikedByUser = true;
          _news.newsLikesCount = _news.newsLikesCount + 1;
        }
        return _news;
      });
      return {
        ...state,
        news: [...filteredLikeNews]
      };
    case "set_dislikeNews":
      const filteredDislikeNews = state.news.map(_news => {
        if (_news.id === action.payload) {
          _news.isLikedByUser = false;
          _news.newsLikesCount = _news.newsLikesCount - 1;
        }
        return _news;
      });
      return {
        ...state,
        news: [...filteredDislikeNews]
      };
    default:
      return state;
  }
};
