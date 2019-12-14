import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  TablePagination
} from "@material-ui/core";
import NewsCardComponent from "../NewsCard/NewsCardComponent";
import { getUser } from "../../services/UserService";
import { getNews } from "../../services/NewsService";

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
  const [user, setUser] = useState({});
  const [news, setNews] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

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
        const result = await getNews({
          pagination: {
            page: 0,
            size: 10
          },
          ownerUsernames: username
        });
        setNews(result.data);
        setTotalCount(Number(result.totalCount));
      } catch (err) {
        console.log(err);
      }
    }
    fetchUserNews();
  }, [username]);

  const classes = useStyles();

  const renderNews = () => {
    if (news.length) {
      return (
        <>
          <div style={styles.container}>
            {news.map(_new => (
              <NewsCardComponent
                key={_new.id}
                news={_new}
                loading={false}
                dispatch={null}
              />
            ))}
          </div>
          <div style={styles.paginationContainer}>
            <TablePagination
              component="div"
              count={totalCount}
              rowsPerPage={10}
              page={0}
              onChangePage={() => {}}
            />
          </div>
        </>
      );
    } else {
      return <div style={styles.emptyContainer}>NEWS NOT FOUND</div>;
    }
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
            <div>Follow</div>
          </div>
        </CardContent>
      </Card>
      {renderNews()}
    </>
  );
};

export default ProfileComponent;
