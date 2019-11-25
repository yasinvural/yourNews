import React from "react";
import { Card, Avatar } from "@material-ui/core";

const CommentBoxComponent = ({
  content,
  userLogin,
  userImageUrl,
  updatedAt
}) => {
  return (
    <Card className="flex p01">
      <div>
        <Avatar src={userImageUrl} />
      </div>
      <div className="flex flex-column ml1 flex1">
        <div className="flex justify-space-between">
          <div>{userLogin}</div>
          <div>{new Date(updatedAt).toLocaleDateString()}</div>
        </div>
        <div>{content}</div>
      </div>
    </Card>
  );
};

export default CommentBoxComponent;
