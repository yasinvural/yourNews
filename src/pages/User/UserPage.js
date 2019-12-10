import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileComponent from "../../components/Profile/ProfileComponent";

const UserPage = () => {
  const params = useParams();
  const [news, setNews] = useState([]);

  useEffect(() => {
    //TODO: get User Info and get User's news
  }, [params.id]);

  return (
    <div>
      <ProfileComponent username={params.id} />
    </div>
  );
};

export default UserPage;
