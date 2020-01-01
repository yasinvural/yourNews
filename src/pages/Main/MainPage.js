import React, { useReducer } from "react";
import AppBarComponent from "../../components/AppBar/AppBarComponent";
import CategoryTabComponent from "../../components/CategoryTab/CategoryTabComponent";
import NewsListComponent from "../../components/NewsList/NewsListComponent";
import { NewsContext } from "../../context/NewsContext";
import { initialState, reducer } from "../../reducer/NewsReducer";

const MainPage = () => {
  const [news, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <NewsContext.Provider value={{ news, dispatch }}>
        <AppBarComponent />
        <CategoryTabComponent />
        <NewsListComponent />
      </NewsContext.Provider>
    </>
  );
};

export default MainPage;
