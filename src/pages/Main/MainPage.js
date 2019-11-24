import React, { useEffect, useState } from "react";
import { getNews } from "../../services/NewsService";
import AppBarComponent from "../../components/AppBar/AppBarComponent";
import NewsListComponent from "../../components/NewsList/NewsListComponent";

const MainPage = ({ history }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const result = getNews();
    setLoading(true);
    result
      .then(data => {
        setNews(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.warn(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <AppBarComponent history={history} />
      <NewsListComponent news={news} loading={loading} />
    </>
  );
};

export default MainPage;
