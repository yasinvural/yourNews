import React, { useState, memo } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Badge,
  Popover,
  TextField
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Skeleton from "@material-ui/lab/Skeleton";
import CommentBoxComponent from "../../shared/components/CommentBox/CommentBoxComponent";
import AvatarComponent from "../../shared/components/Avatar/AvatarComponent";
import ResourceTypes from "../../const/ResourceTypes";
import { likeDislikeNews } from "../../services/LikeService";
import { createNewsComment } from "../../services/CommentService";
import { useForceUpdate } from "../../hooks/useForceUpdate";
import { useNewsValue } from "../../context/NewsContext";

const styles = {
  card: {
    width: "21%",
    height: "auto",
    margin: "2% 2%"
  },
  media: {
    height: "220px"
  }
};

const NewsCardComponent = memo(({ news, loading }) => {
  const history = useHistory();
  const forceUpdate = useForceUpdate();
  const [comment, setComment] = useState("");
  const [commentAnchor, setCommentAnchor] = useState(null);
  const { dispatch } = useNewsValue();
  const {
    id,
    ownerProfilePhotoUrl,
    ownerUsername,
    resources,
    newsComments,
    statistic
  } = news;

  const {
    id: resourceId,
    resourceUrl,
    resourceType,
    title,
    description,
    likesCount,
    commentsCount,
    likedByUser
  } = resources[0];

  const handleGoToNewsDetail = () => {
    history.push(`/news/${id}`);
  };

  const handleCommentClick = event => {
    setCommentAnchor(event.currentTarget);
  };

  const handleClosePopover = () => {
    setComment("");
    setCommentAnchor(null);
  };

  const renderTopOfTheCard = () => {
    const handleGoToUserPage = () => {
      history.push(`/user/${ownerUsername}`);
    };

    if (loading) {
      return (
        <div className="flex justify-space-between padding-1 align-center">
          <Skeleton variant="circle" width={40} height={40} />
          <Skeleton height={10} width="80%" />
        </div>
      );
    } else {
      return (
        <div className="flex justify-space-between padding-1 align-center">
          <div onClick={handleGoToUserPage}>
            <AvatarComponent
              size="small"
              imageUrl={ownerProfilePhotoUrl}
              login={ownerUsername}
            />
          </div>
          <div className="text-truncate">{title}</div>
          <div>
            <MoreVertIcon />
          </div>
        </div>
      );
    }
  };

  const renderMediaOfTheCard = () => {
    if (loading) {
      return (
        <Skeleton
          variant="rect"
          width={styles.card.width}
          height={styles.media.height}
        />
      );
    } else {
      if (resourceType === ResourceTypes.Video) {
        return (
          <CardActionArea onClick={handleGoToNewsDetail}>
            <CardMedia style={styles.media}>
              <video width="100%" height="212px" controls>
                <source src={resourceUrl} type="video/mp4" />
                <source src={resourceUrl} type="video/ogg" />
              </video>
            </CardMedia>
            <CardContent>
              <span>{description}</span>
            </CardContent>
          </CardActionArea>
        );
      } else {
        return (
          <CardActionArea>
            <CardMedia style={styles.media} image={resourceUrl} />
            <CardContent>
              <span>{description}</span>
            </CardContent>
          </CardActionArea>
        );
      }
    }
  };

  const openCommentPopover = Boolean(commentAnchor);

  const renderBottomOfTheCard = () => {
    const handleLikeDislikeNews = async () => {
      const reqObj = {
        newsId: id,
        resourceId: resourceId
      };
      const response = await likeDislikeNews(reqObj);

      dispatch({
        type: "set_likeNews",
        payload: response
      });
      forceUpdate();
    };

    const handleCommentKeyPress = e => {
      const comment = e.target.value.trim();

      const handleCreateComment = async () => {
        const reqObj = {
          body: comment,
          newsId: id,
          resourceId
        };
        const res = await createNewsComment(reqObj);
        if (res.success) {
          handleClosePopover();
          dispatch({
            type: "set_comment",
            payload: res.data
          });
        }
      };

      if (e.key === "Enter") {
        if (comment) handleCreateComment();
      }
    };

    if (loading) {
      return (
        <div>
          <Skeleton />
          <Skeleton width="30%" />
        </div>
      );
    } else {
      return (
        <CardActions>
          <div className="margin-left-1">
            <Badge
              badgeContent={likesCount}
              className="pointer"
              color="primary"
            >
              {likedByUser ? (
                <FavoriteIcon
                  style={{ color: "red" }}
                  onClick={handleLikeDislikeNews}
                />
              ) : (
                <FavoriteBorderIcon onClick={handleLikeDislikeNews} />
              )}
            </Badge>
          </div>
          <div className="margin-left-1">
            <Badge
              badgeContent={commentsCount}
              className="pointer"
              color="primary"
            >
              <ChatBubbleOutlineIcon onClick={handleCommentClick} />
              <Popover
                open={openCommentPopover}
                anchorEl={commentAnchor}
                onClose={handleClosePopover}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center"
                }}
              >
                <div className="padding-1">
                  <TextField
                    placeholder="Press enter to add comment"
                    variant="outlined"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    onKeyPress={handleCommentKeyPress}
                  />
                </div>
              </Popover>
            </Badge>
          </div>
          <div className="margin-right-1 flex-1 text-align-right">
            {(statistic && statistic.viewedCount) || 0} times viewed
          </div>
        </CardActions>
      );
    }
  };

  const renderCommentBox = () => {
    const { userImageUrl, userLogin, content, updatedAt, userId, id } =
      newsComments && newsComments.length > 0 && newsComments[0];
    if (newsComments.length > 0) {
      if (loading) {
        return (
          <>
            <div className="flex justify-space-between padding-1 align-center">
              <Skeleton variant="circle" width={40} height={40} />
              <Skeleton height={20} width="80%" />
            </div>
          </>
        );
      } else {
        return (
          <CommentBoxComponent
            id={id}
            userId={userId}
            userImageUrl={userImageUrl}
            userLogin={userLogin}
            content={content}
            updatedAt={updatedAt}
          />
        );
      }
    } else {
      return null;
    }
  };

  return (
    <>
      <Card style={styles.card}>
        {renderTopOfTheCard()}
        {renderMediaOfTheCard()}
        {renderBottomOfTheCard()}
      </Card>
    </>
  );
});

export default NewsCardComponent;
