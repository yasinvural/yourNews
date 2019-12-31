import React from "react";
import AppBarComponent from "../../components/AppBar/AppBarComponent";
import CategoryTabComponent from "../../components/CategoryTab/CategoryTabComponent";
import NewsListComponent from "../../components/NewsList/NewsListComponent";
import { NewsProvider } from "../../context/NewsContext";
import { initialState, reducer } from "../../reducer/NewsReducer";

const MainPage = () => {
  return (
    <>
      <NewsProvider initialState={initialState} reducer={reducer}>
        <AppBarComponent />
        <CategoryTabComponent />
        <NewsListComponent />
      </NewsProvider>
    </>
  );
};

export default MainPage;
