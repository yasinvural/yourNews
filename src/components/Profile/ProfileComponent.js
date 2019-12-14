import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    width: "100%",
    height: 300
  },
  media: {
    height: 240
  }
}));

const ProfileComponent = ({ username, userImageUrl }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    //TODO: get user data
  }, [username]);

  const classes = useStyles();
  return (
    <>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        />
        <CardContent>
          <div className="flex justify-space-between">
            <div>{username}</div>
            <div>Follow</div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileComponent;
