import React, { useState } from "react";
import { Card, Avatar, Typography, Popover } from "@material-ui/core";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import moment from "moment";
import { deleteNewsComment } from "../../../services/CommentService";
import userManager from "../../../utils/userManager";

const user = JSON.parse(userManager.getItem("user"));

const CommentBoxComponent = ({
  id,
  content,
  userLogin,
  userId,
  userImageUrl,
  updatedAt
}) => {
  const [deleteAnchor, setDeleteAnchor] = useState(null);

  const handleOpenDeletePopover = e => {
    setDeleteAnchor(e.currentTarget);
  };

  const handleCloseDeletePopover = () => {
    setDeleteAnchor(null);
  };

  const open = Boolean(deleteAnchor);

  const renderDeletePopover = () => {

    const deleteComment = id => {
      deleteNewsComment(id);
      // TODO: card should reRender.
      handleCloseDeletePopover();
    };
    
    if (user.id === userId) {
      return (
        <div className="align-self-start">
          <div onClick={handleOpenDeletePopover}>
            <KeyboardArrowDownOutlinedIcon />
          </div>
          <Popover
            open={open}
            anchorEl={deleteAnchor}
            onClose={handleCloseDeletePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            <div className="padding-1 pointer" onClick={()=>deleteComment(id)}>Delete Comment</div>
          </Popover>
        </div>
      );
    }
  };
  return (
    <Card className="flex padding-1 align-center">
      <div>
        <Avatar src={userImageUrl} />
      </div>
      <div className="flex flex-column margin-left-1 margin-right-1 flex-1">
        <div className="flex justify-space-between align-center">
          <Typography variant="h6">{userLogin}</Typography>
          <Typography variant="caption">
            {moment(updatedAt, "YYYY-MM-DD").fromNow()}
          </Typography>
        </div>
        <Typography variant="subtitle2">{content}</Typography>
      </div>
      {renderDeletePopover()}
    </Card>
  );
};

export default CommentBoxComponent;
