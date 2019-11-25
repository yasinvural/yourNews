import React, { useState } from "react";
import { AppBar, Toolbar, Popover, Button } from "@material-ui/core";
import AvatarComponent from "../../shared/components/Avatar/AvatarComponent";

const AppBarComponent = ({ history }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAnchorClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    handleAnchorClose();
    history.push("/");
  };

  const open = Boolean(anchorEl);

  const renderAvatar = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { imageUrl, login } = user;
    return (
      <AvatarComponent
        size="medium"
        imageUrl={imageUrl}
        login={login}
        handleClick={handleAnchorClick}
      />
    );
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar className="justify-space-between">
          <div>Your News</div>
          {renderAvatar()}
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleAnchorClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            <div className="mt1 mb1 ml1 mr1">
              <Button color="primary" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </Popover>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppBarComponent;
