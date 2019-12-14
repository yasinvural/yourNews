import React from "react";
import { useParams } from "react-router-dom";
import ProfileComponent from "../../components/Profile/ProfileComponent";

const UserPage = () => {
  const params = useParams();

  return (
    <div>
      <ProfileComponent username={params.name} />
    </div>
  );
};

export default UserPage;
