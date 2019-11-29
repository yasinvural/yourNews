import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Badge
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Skeleton from "@material-ui/lab/Skeleton";
import CommentBoxComponent from "../../shared/components/CommentBox/CommentBoxComponent";
import AvatarComponent from "../../shared/components/Avatar/AvatarComponent";
import ResourceTypes from "../../const/ResourceTypes";
import { likeNews, dislikeNews } from "../../services/LikeService";

const styles = {
  card: {
    width: "29%",
    margin: "2% 2%"
  },
  media: {
    height: "240px"
  }
};

const NewsCardComponent = ({ news, loading }) => {
  const {
    id,
    title,
    description,
    imageUrl,
    userLogin,
    resources,
    newsComments,
    newsCommentsCount,
    newsLikesCount,
    isLikedByUser
  } = news;
  const renderTopOfTheCard = () => {
    if (loading) {
      return <Skeleton />;
    } else {
      return (
        <div className="flex justify-space-between p1 align-center">
          <div>
            <AvatarComponent
              size="small"
              imageUrl={imageUrl}
              login={userLogin}
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
      if (
        resources.length &&
        resources[0].resourceType === ResourceTypes.Video
      ) {
        return (
          <CardActionArea>
            <CardMedia style={styles.media} image={imageUrl}>
              {/* <video width="100%" controls>
                <source src={resources[0].resourceName} type="video/mp4" />
                <source src={resources[0].resourceName} type="video/ogg" />
              </video> */}
            </CardMedia>
            <CardContent>
              <span>{description}</span>
            </CardContent>
          </CardActionArea>
        );
      } else {
        return (
          <CardActionArea>
            <CardMedia
              style={styles.media}
              image={resources.length && resources[0].resourceName}
            />
            <CardContent>
              <span>{description}</span>
            </CardContent>
          </CardActionArea>
        );
      }
    }
  };

  const renderBottomOfTheCard = () => {
    const handleLikeNews = () => {
      const reqObj = {
        newsId: id,
        userId: 4
      };
      const response = likeNews(reqObj);
      response.then(data => {
        debugger;
      });
    };

    const handleDislikeNews = () => {
      const reqObj = {
        newsId: id,
        userId: 4
      };
      const response = dislikeNews(reqObj);
      response
        .then(data => {
          debugger;
        })
        .catch(err => {
          debugger;
        });
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
          <div className="ml1">
            <Badge
              badgeContent={newsLikesCount}
              className="pointer"
              color="primary"
            >
              {isLikedByUser ? (
                <FavoriteIcon
                  style={{ color: "red" }}
                  onClick={handleDislikeNews}
                />
              ) : (
                <FavoriteBorderIcon onClick={handleLikeNews} />
              )}
            </Badge>
          </div>
          <div className="ml1">
            <Badge
              badgeContent={newsCommentsCount}
              className="pointer"
              color="primary"
            >
              <ChatBubbleOutlineIcon />
            </Badge>
          </div>
        </CardActions>
      );
    }
  };

  const renderCommentBox = () => {
    const { userImageUrl, userLogin, content, updatedAt, userId, id } =
      newsComments && newsComments.length > 0 && newsComments[0];
    if (newsComments.length > 0) {
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
        {renderCommentBox()}
      </Card>
    </>
  );
};

export default NewsCardComponent;
