import React, { useState, useEffect } from "react";
import NewsCardComponent from "../NewsCard/NewsCardComponent";
import { getNews } from "../../services/NewsService";
import { useNewsValue } from "../../context/NewsContext";

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
  const totalCount = 14;
  const [{ news, pagination, loading }, dispatch] = useNewsValue();
  const { page, size } = pagination;
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    if (requestSent) return;

    const result = getNews({
      pagination: {
        page,
        size
      }
    });
    dispatch({
      type: "set_loading",
      payload: true
    });
    setRequestSent(true);
    result
      .then(data => {
        dispatch({
          type: "set_news",
          payload: data.data
        });
        setTimeout(() => {
          dispatch({
            type: "set_loading",
            payload: false
          });
          setRequestSent(false);
        }, 0);
      })
      .catch(err => {
        console.warn(err);
        dispatch({
          type: "set_loading",
          payload: false
        });
        setRequestSent(false);
      });
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll);
    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  });

  const handleOnScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    if (scrolledToBottom) {
      if (totalCount != news.length) {
        dispatch({
          type: "set_page",
          payload: page + 1
        });
        return;
      }
    }
  };

  return (
    <div style={styles.container}>
      {news &&
        news.map(_new => (
          <NewsCardComponent key={_new.id} news={_new} loading={loading} dispatch={dispatch} />
        ))}
    </div>
  );
};

export default NewsListComponent;
