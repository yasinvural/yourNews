import React, { useEffect, useState } from "react";
import { getNews } from "../../services/NewsService";
import AppBarComponent from "../../components/AppBar/AppBarComponent";

const MainPage = ({ history }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const result = getNews();
    result
      .then(data => {
        setNews(data.data);
      })
      .catch(err => {
        console.warn(err);
      });
  }, []);

  return (
    <>
      <AppBarComponent history={history} />
    </>
  );
};

export default MainPage;
