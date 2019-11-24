import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Avatar,
  Badge
} from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Skeleton from "@material-ui/lab/Skeleton";

const styles = {
  card: {
    // maxWidth: "345px",
    // minWidth: "345px",
    width: "29%",
    margin: "2% 2%"
  },
  media: {
    height: "240px"
  },
  avatar: {
    width: "24px",
    height: "24px",
    fontSize: "0.75rem"
  }
};

const NewsCardComponent = ({ news, loading }) => {
  const {
    title,
    description,
    imageUrl,
    newsCommentsCount,
    newsLikesCount
  } = news;

  const renderTopOfTheCard = () => {
    if (loading) {
      return <Skeleton />;
    } else {
      return (
        <div className="flex justify-space-between p1">
          <div>
            <Avatar style={styles.avatar}>YV</Avatar>
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
      return (
        <CardActionArea>
          <CardMedia
            style={styles.media}
            image={imageUrl}
            title="Contemplative Reptile"
          />
          <CardContent>
            <span>{description}</span>
          </CardContent>
        </CardActionArea>
      );
    }
  };

  const renderBottomOfTheCard = () => {
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
            <Badge badgeContent={newsLikesCount} color="primary">
              <FavoriteBorderIcon />
            </Badge>
          </div>
          <div className="ml1">
            <Badge badgeContent={newsCommentsCount} color="primary">
              <ChatBubbleOutlineIcon />
            </Badge>
          </div>
        </CardActions>
      );
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
};

export default NewsCardComponent;
