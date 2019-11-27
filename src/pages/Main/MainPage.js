import React from "react";
import AppBarComponent from "../../components/AppBar/AppBarComponent";
import FilterContainerComponent from "../../components/FilterContainer/FilterContainerComponent";
import NewsListComponent from "../../components/NewsList/NewsListComponent";

const MainPage = ({ history }) => {
  return (
    <>
      <AppBarComponent history={history} />
      <FilterContainerComponent />
      <NewsListComponent />
    </>
  );
};

export default MainPage;
