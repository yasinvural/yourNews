import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getNewsById } from "../../services/NewsService";
import { getNewsComment } from "../../services/CommentService";
import moment from "moment";
import { Paper } from "@material-ui/core";

const NewsDetailComponent = () => {
  const [newsDetail, setNewsDetail] = useState({});
  const [newsComment, setNewsComment] = useState([]);
  const [totalCommentCount, setTotalCommentCount] = useState(0);

  const params = useParams();

  useEffect(() => {
    async function fetchNews() {
      const result = await getNewsById(params.id);
      setNewsDetail(result.data);
    }
    async function fetchComments() {
      const result = await getNewsComment({ newsId: params.id });
      setNewsComment(result.data);
      setTotalCommentCount(result.totalCount);
    }
    fetchNews();
    fetchComments();
  }, [params.id]);

  console.log(newsDetail);
  console.log(newsComment);

  const renderCommentSection = () => {
    return (
      <div className="comment-section">
        <div className="comment-section__header">
          Comments({totalCommentCount})
        </div>
        <div className="comment-section__comments">
          {newsComment.map(comment => (
            <div className="comment-container">
              <div className="comment-container__owner">
                <img src={comment.ownerProfilePhotoUrl} alt="" />
              </div>
              <div className="comment-container__body">
                <div className="comment-container__body__username">
                  {comment.ownerUsername}
                </div>
                <div className="comment-container__body__comment">
                  {comment.body}
                </div>
                <div className="comment-container__body__date">
                  {moment(comment.createdAt, "YYYY-MM-DD").fromNow()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="news-detail">
      <Paper elevation={2}>
        <section>{renderCommentSection()}</section>
      </Paper>
    </div>
  );
};

export default NewsDetailComponent;
