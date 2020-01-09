import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getNewsById } from "../../services/NewsService";
import { getNewsComment } from "../../services/CommentService";
import moment from "moment";
import AvatarComponent from "../../shared/components/Avatar/AvatarComponent";
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

  const renderNewsSection = () => {
    return (
      <div className="news-section">
        <div className="news-section__header">
          {newsDetail &&
            newsDetail.resources &&
            newsDetail.resources[0] &&
            newsDetail.resources[0].title}
        </div>
        <div className="news-section__description">
          {newsDetail &&
            newsDetail.resources &&
            newsDetail.resources[0] &&
            newsDetail.resources[0].description}
        </div>
        <div className="news-section__resource">
          <video width="100%" height="212px" controls>
            <source
              src={
                newsDetail &&
                newsDetail.resources &&
                newsDetail.resources[0] &&
                newsDetail.resources[0].resourceUrl
              }
              type="video/mp4"
            />
            <source
              src={
                newsDetail &&
                newsDetail.resources &&
                newsDetail.resources[0] &&
                newsDetail.resources[0].resourceUrl
              }
              type="video/ogg"
            />
          </video>
        </div>
      </div>
    );
  };

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
                <AvatarComponent
                  size="small"
                  imageUrl={comment.ownerProfilePhotoUrl}
                  login={comment.ownerUsername}
                />
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
        <section>{renderNewsSection()}</section>
        <section>{renderCommentSection()}</section>
      </Paper>
    </div>
  );
};

export default NewsDetailComponent;
