import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Popover,
  Button,
  OutlinedInput,
  InputAdornment
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AvatarComponent from "../../shared/components/Avatar/AvatarComponent";
import { NewsContext } from "../../context/NewsContext";
import { debounce } from "../../utils/debounce";
import userManager from "../../utils/userManager";

const styles = {
  color: "white"
};

const AppBarComponent = () => {
  const history = useHistory();
  const { dispatch } = useContext(NewsContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const user = JSON.parse(userManager.getItem("user"));

  const handleAnchorClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };

  const handleGoToMyProfile = () => {
    history.push(`/user/${user.login}`);
  };

  const handleLogout = () => {
    userManager.removeItem("token");
    userManager.removeItem("user");
    handleAnchorClose();
    history.push("/");
  };

  const open = Boolean(anchorEl);

  const renderAvatar = () => {
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

  const handleChangeSearchText = debounce(searchText => {
    dispatch({
      type: "set_searchText",
      payload: searchText
    });
  }, 500);

  return (
    <>
      <AppBar position="static">
        <Toolbar className="justify-space-between">
          <div>Your News</div>
          <OutlinedInput
            style={styles}
            placeholder="Search News"
            className="flex-1 margin-right-2 margin-left-2"
            onChange={e => handleChangeSearchText(e.target.value)}
            startAdornment={
              <InputAdornment style={styles} position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
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
            <div className="margin-1 flex flex-column">
              <Button color="primary" onClick={handleGoToMyProfile}>
                My Profile
              </Button>
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
