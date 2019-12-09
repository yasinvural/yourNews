import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Popover,
  Button,
  OutlinedInput,
  InputAdornment,
  TextField
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AvatarComponent from "../../shared/components/Avatar/AvatarComponent";
import { useNewsValue } from "../../context/NewsContext";
import { debounce } from "../../utils/debounce";

const AppBarComponent = ({ history }) => {
  const [{}, dispatch] = useNewsValue();
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
            placeholder="Type to search"
            className="flex1 mr2 ml2"
            onChange={e => handleChangeSearchText(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
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
