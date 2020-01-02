import React, { memo } from "react";
import { useHistory } from "react-router-dom";
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
import { likeDislikeNews } from "../../services/LikeService";
import { useForceUpdate } from "../../hooks/useForceUpdate";
import { useNewsValue } from "../../context/NewsContext";

const styles = {
  card: {
    width: "21%",
    height: "auto",
    margin: "2% 2%"
  },
  media: {
    height: "160px"
  }
};

const NewsCardComponent = memo(({ news, loading }) => {
  const history = useHistory();
  const forceUpdate = useForceUpdate();
  const { dispatch } = useNewsValue();
  const {
    id,
    ownerProfilePhotoUrl,
    ownerUsername,
    resources,
    newsComments
  } = news;

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
          <div className="text-truncate">
            {resources.length && resources[0].title}
          </div>
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
            <CardMedia style={styles.media} image={ownerProfilePhotoUrl}>
              {/* <video width="100%" controls>
                <source src={resources[0].resourceName} type="video/mp4" />
                <source src={resources[0].resourceName} type="video/ogg" />
              </video> */}
            </CardMedia>
            <CardContent>
              <span>{resources[0].description}</span>
            </CardContent>
          </CardActionArea>
        );
      } else {
        return (
          <CardActionArea>
            <CardMedia style={styles.media} image={resources[0].resourceUrl} />
            <CardContent>
              <span>{resources[0].description}</span>
            </CardContent>
          </CardActionArea>
        );
      }
    }
  };

  const renderBottomOfTheCard = () => {
    const handleLikeDislikeNews = async () => {
      const reqObj = {
        newsId: id,
        resourceId: resources[0].id
      };
      const response = await likeDislikeNews(reqObj);

      dispatch({
        type: "set_likeNews",
        payload: response
      });
      forceUpdate();
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
              badgeContent={resources.length && resources[0].likesCount}
              className="pointer"
              color="primary"
            >
              {resources[0].likedByUser ? (
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
              badgeContent={resources.length && resources[0].commentsCount}
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
