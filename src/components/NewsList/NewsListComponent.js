import React, { useState, useEffect } from "react";
import NewsCardComponent from "../NewsCard/NewsCardComponent";
import { getNews } from "../../services/NewsService";
import { useNewsValue } from "../../context/NewsContext";
import { TablePagination } from "@material-ui/core";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    background: "#fcfcfc"
  },
  paginationContainer: {
    display: "flex",
    flex: "1",
    justifyContent: "center",
    background: "#fcfcfc"
  }
};

const NewsListComponent = () => {
  const totalCount = 53;
  const [{ news, pagination, loading, searchText }, dispatch] = useNewsValue();
  const { page, size } = pagination;
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    if (requestSent) return;
    async function fetchNewsData() {
      dispatch({
        type: "set_loading",
        payload: true
      });
      setRequestSent(true);
      try {
        const result = await getNews({
          pagination: {
            page,
            size
          },
          "title.contains": searchText
        });
        dispatch({
          type: "set_news",
          payload: result.data
        });
        setTimeout(() => {
          dispatch({
            type: "set_loading",
            payload: false
          });
          setRequestSent(false);
        }, 0);
      } catch (err) {
        console.log(err.message);
        dispatch({
          type: "set_loading",
          payload: false
        });
        setRequestSent(false);
      }
    }
    fetchNewsData();
  }, [page, searchText]);

  const handleChangePage = (event, newPage) => {
    window.scrollTo(0, 0);
    dispatch({
      type: "set_page",
      payload: newPage
    });
  };

  return (
    <>
      <div style={styles.container}>
        {news.map(_new => (
            <NewsCardComponent
              key={_new.id}
              news={_new}
              loading={loading}
              dispatch={dispatch}
            />
          ))}
      </div>
      <div style={styles.paginationContainer}>
        <TablePagination
          component="div"
          count={totalCount}
          rowsPerPage={size}
          page={page}
          onChangePage={handleChangePage}
        />
      </div>
    </>
  );
};

export default NewsListComponent;
