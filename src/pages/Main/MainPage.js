import React from "react";
import CategoryTabComponent from "../../components/CategoryTab/CategoryTabComponent";
import NewsListComponent from "../../components/NewsList/NewsListComponent";

const MainPage = () => {
  return (
    <>
      <CategoryTabComponent />
      <NewsListComponent />
    </>
  );
};

export default MainPage;
