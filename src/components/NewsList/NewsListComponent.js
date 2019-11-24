import React from "react";
import NewsCardComponent from "../NewsCard/NewsCardComponent";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    background: "#fcfcfc"
  }
};

const NewsListComponent = ({ news, loading }) => {
  return (
      <div style={styles.container}>
        {news.map(_new => (
          <NewsCardComponent key={_new.id} news={_new} loading={loading} />
        ))}
      </div>
  );
};

export default NewsListComponent;
