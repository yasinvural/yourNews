import React, { useState, useEffect } from "react";
import NewsCardComponent from "../NewsCard/NewsCardComponent";
import { getNews } from "../../services/NewsService";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    background: "#fcfcfc"
    // height:"1100px",
    // overflow:"hidden"
  }
};

const NewsListComponent = () => {
  const size = 10;
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const result = getNews({
      pagination: {
        page,
        size
      }
    });
    setLoading(true);
    result
      .then(data => {
        setNews(n=> [...n, ...data]);
        setTimeout(() => {
          setLoading(false);
        }, 0);
      })
      .catch(err => {
        console.warn(err);
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll',handleOnScroll);
    return () => {
      window.removeEventListener('scroll',handleOnScroll);
    };
  })

  const handleOnScroll = () => {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    if(scrolledToBottom){
      console.log('bottom');
      setPage(p=> p+1);
      return;
    }
  };

  return (
    <div style={styles.container}>
      {news &&
        news.map(_new => (
          <NewsCardComponent key={_new.id} news={_new} loading={loading} />
        ))}
    </div>
  );
};

export default NewsListComponent;
