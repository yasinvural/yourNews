import React, { useState, useEffect, useContext } from "react";
import NewsCardComponent from "../NewsCard/NewsCardComponent";
import { getNews } from "../../services/NewsService";
import { NewsContext } from "../../context/NewsContext";
import { TablePagination } from "@material-ui/core";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    background: "#fcfcfc"
  },
  emptyContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    background: "#fcfcfc",
    justifyContent: "center",
    alignItems: "center",
    height: "78vh",
    fontSize: "25px",
    color: "#cccccc",
    letterSpacing: "30px"
  },
  paginationContainer: {
    display: "flex",
    flex: "1",
    justifyContent: "center",
    background: "#fcfcfc"
  }
};

const NewsListComponent = () => {
  const { news, dispatch } = useContext(NewsContext);
  const { data, pagination, loading, searchText, selectedCategory } = news;
  const { page, size } = pagination;
  const [requestSent, setRequestSent] = useState(false);
  const [totalCount, setTotalCount] = useState(false);

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
          title: searchText,
          categoryNames: selectedCategory
        });
        dispatch({
          type: "set_news",
          payload: result.data
        });
        setTotalCount(Number(result.totalCount));
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
  }, [page, searchText, selectedCategory]);

  const handleChangePage = (event, newPage) => {
    window.scrollTo(0, 0);
    dispatch({
      type: "set_page",
      payload: newPage
    });
  };

  const renderNews = () => {
    if (data.length) {
      return (
        <>
          <div style={styles.container}>
            {data.map(_new => (
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
    } else {
      return <div style={styles.emptyContainer}>NEWS NOT FOUND</div>;
    }
  };

  return renderNews();
};

export default NewsListComponent;
