import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Avatar
} from "@material-ui/core";

const styles = {
  card: {
    // maxWidth: "345px",
    // minWidth: "345px",
    width: '29%',
    margin:'2% 2%'
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

const NewsCardComponent = ({ news }) => {
  const { title, description, imageUrl } = news;
  return (
    <>
      <Card style={styles.card}>
        <div className="flex justify-space-between p1">
          <div>
            <Avatar style={styles.avatar}>YV</Avatar>
          </div>
          <div className="text-truncate">{title}</div>
          <div>button</div>
        </div>
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
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default NewsCardComponent;
