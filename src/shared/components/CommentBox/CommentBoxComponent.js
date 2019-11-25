import React from "react";
import { Card, Avatar, Typography } from "@material-ui/core";
import moment from "moment";

const CommentBoxComponent = ({
  content,
  userLogin,
  userImageUrl,
  updatedAt
}) => {
  return (
    <Card className="flex p1 align-center">
      <div>
        <Avatar src={userImageUrl} />
      </div>
      <div className="flex flex-column ml1 flex1">
        <div className="flex justify-space-between align-center">
          <Typography variant="h6">{userLogin}</Typography>
          <Typography variant="subtitle2">{moment(updatedAt, "YYYY-MM-DD").fromNow()}</Typography>
        </div>
        <div>{content}</div>
      </div>
    </Card>
  );
};

export default CommentBoxComponent;
