import React from "react";
import AppBarComponent from "../../components/AppBar/AppBarComponent";
import FilterContainerComponent from "../../components/FilterContainer/FilterContainerComponent";
import NewsListComponent from "../../components/NewsList/NewsListComponent";
import { NewsProvider } from "../../context/NewsContext";
import { initialState, reducer } from "../../reducer/NewsReducer";

const MainPage = ({ history }) => {
  return (
    <>
      <AppBarComponent history={history} />
      <NewsProvider initialState={initialState} reducer={reducer}>
        <FilterContainerComponent />
        <NewsListComponent />
      </NewsProvider>
    </>
  );
};

export default MainPage;
