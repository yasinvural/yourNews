import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  TablePagination,
  Tabs,
  Tab
} from "@material-ui/core";
import NewsCardComponent from "../NewsCard/NewsCardComponent";
import { getUser } from "../../services/UserService";
import { getNews } from "../../services/NewsService";
import {
  followUser,
  followedUser,
  unFollowUser
} from "../../services/FollowService";
import {useNewsValue} from "../../context/NewsContext";

const useStyles = makeStyles(theme => ({
  card: {
    width: "100%",
    height: 300
  },
  media: {
    height: 240
  }
}));

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    background: "#fcfcfc"
  },
  emptyContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    background: "#fcfcfc",
    justifyContent: "center",
    alignItems: "center",
    height: "78vh",
    fontSize: "25px",
    color: "#cccccc",
    letterSpacing: "30px"
  },
  paginationContainer: {
    display: "flex",
    flex: "1",
    justifyContent: "center",
    background: "#fcfcfc"
  }
};

const ProfileComponent = ({ username, userImageUrl }) => {
  const {news, dispatch} = useNewsValue();
  const {data,loading,pagination} = news;
  const {page,size} = pagination;
  const [user, setUser] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [showFollowButton, setShowFollowButton] = useState(true);

  useEffect(() => {
    async function fetchFollowedUser() {
      try {
        const result = await followedUser(username);
        if (result.data) {
          setShowFollowButton(false);
        } else {
          setShowFollowButton(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
    // TODO: do not call if username === localStorage.user.login
    fetchFollowedUser();
  }, [username]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await getUser(username);
        setUser(user.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUserData();
  }, [username]);

  useEffect(() => { 
    async function fetchUserNews() {
      try {
        dispatch({
          type: "set_loading",
          payload: true
        });
        const result = await getNews({
          pagination: {
            page,
            size
          },
          ownerUsernames: username
        });
        dispatch({
          type: "set_news",
          payload: result.data
        });
        setTotalCount(Number(result.totalCount));
        setTimeout(() => {
          dispatch({
            type: "set_loading",
            payload: false
          });
        }, 0);
      } catch (err) {
        console.log(err);
        dispatch({
          type: "set_loading",
          payload: false
        });
      }
    }
    fetchUserNews();
  }, [username, page]);

  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    window.scrollTo(0, 0);
    dispatch({
      type: "set_page",
      payload: newPage
    });
  };

  const renderNews = () => {
    if (news.data.length) {
      return (
        <>
          <div style={styles.container}>
            {news.data.map(_new => (
              <NewsCardComponent
                key={_new.id}
                news={_new}
                loading={loading}
              />
            ))}
          </div>
          <div style={styles.paginationContainer}>
            <TablePagination
              component="div"
              count={totalCount}
              rowsPerPage={size}
              page={page}
              onChangePage={handleChangePage}
            />
          </div>
        </>
      );
    } else {
      return <div style={styles.emptyContainer}>NEWS NOT FOUND</div>;
    }
  };

  const handleFollowUser = async () => {
    const result = await followUser(username);
    if (result.data) {
      setShowFollowButton(false);
    }
  };

  const handleUnfollowUser = async () => {
    const result = await unFollowUser(username);
    if (result.data){
      setShowFollowButton(true);
    }
  };

  const handleTabValueChange = (event, newValue) => {
    setTabValue(newValue);
  };

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
            <div>
              {user && user.user && user.user.firstName}
              {user && user.user && user.user.lastName}
            </div>
            <div>
              followed Count:
              {user &&
                user.followerStatistics &&
                user.followerStatistics.followedCount}
            </div>
            <div>
              follower Count:
              {user &&
                user.followerStatistics &&
                user.followerStatistics.followerCount}
            </div>
            <div>
              waitingRequest Count:
              {user &&
                user.followerStatistics &&
                user.followerStatistics.waitingRequestCount}
            </div>
            {showFollowButton ? (
              <Button onClick={handleFollowUser}>Follow</Button>
            ) : (
              <Button onClick={handleUnfollowUser}>Unfollow</Button>
            )}
          </div>
        </CardContent>
      </Card>
      <Tabs
        value={tabValue}
        variant="scrollable"
        indicatorColor="primary"
        onChange={handleTabValueChange}
      >
        <Tab key={0} label="News" />
        <Tab key={1} label="Followers" />
      </Tabs>
      {tabValue === 0 && renderNews()}
      {tabValue === 1 && <div>followers will be here.</div>}
    </>
  );
};

export default ProfileComponent;
