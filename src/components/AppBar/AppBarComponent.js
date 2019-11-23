import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Popover,
  Button
} from "@material-ui/core";

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
    handleAnchorClose();
    history.push("/");
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <AppBar position="static">
        <Toolbar className="justify-space-between">
          <div>Your News</div>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
            onClick={handleAnchorClick}
          >
            YV
          </IconButton>
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
