import React from "react";
import AppBarComponent from "../../components/AppBar/AppBarComponent";
import NewsListComponent from "../../components/NewsList/NewsListComponent";

const MainPage = ({ history }) => {
  return (
    <>
      <AppBarComponent history={history} />
      <NewsListComponent />
    </>
  );
};

export default MainPage;
