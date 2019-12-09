import React from "react";
import AppBarComponent from "../../components/AppBar/AppBarComponent";
import FilterContainerComponent from "../../components/FilterContainer/FilterContainerComponent";
import CategoryTabComponent from "../../components/CategoryTab/CategoryTabComponent";
import NewsListComponent from "../../components/NewsList/NewsListComponent";
import { NewsProvider } from "../../context/NewsContext";
import { initialState, reducer } from "../../reducer/NewsReducer";

const MainPage = ({ history }) => {
  return (
    <>
      <AppBarComponent history={history} />
      <NewsProvider initialState={initialState} reducer={reducer}>
        <CategoryTabComponent />
        <FilterContainerComponent />
        <NewsListComponent />
      </NewsProvider>
    </>
  );
};

export default MainPage;
