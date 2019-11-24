import React from "react";
import NewsCardComponent from "../NewsCard/NewsCardComponent";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    background: "antiquewhite"
  }
};

const NewsListComponent = ({ news }) => {
  return (
      <div style={styles.container}>
        {news.map(_new => (
          <NewsCardComponent key={_new.id} news={_new} />
        ))}
      </div>
  );
};

export default NewsListComponent;
