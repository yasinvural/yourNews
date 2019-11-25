import React from "react";
import { Avatar } from "@material-ui/core";

const AvatarComponent = ({ size, imageUrl, login, handleClick = null }) => {
  if (imageUrl) {
    return <Avatar src={imageUrl} onClick={handleClick} />;
  } else {
    return <Avatar onClick={handleClick}>{login[0]}</Avatar>;
  }
};

export default AvatarComponent;
