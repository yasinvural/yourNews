import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getNewsById } from "../../services/NewsService";

const NewsDetailComponent = () => {
  const [newsDetail, setNewsDetail] = useState({});
  const params = useParams();

  useEffect(() => {
    async function fetchNews() {
      const result = await getNewsById(params.id);
      setNewsDetail(result.data);
    }
    fetchNews();
  }, [params.id]);

  return (
    <div className="news-detail">
      <pre>{JSON.stringify(newsDetail, null, 2)}</pre>
    </div>
  );
};

export default NewsDetailComponent;
