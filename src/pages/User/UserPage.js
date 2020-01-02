import React, { useReducer } from "react";
import { useParams } from "react-router-dom";
import ProfileComponent from "../../components/Profile/ProfileComponent";
import { NewsContext } from "../../context/NewsContext";
import { initialState, reducer } from "../../reducer/NewsReducer";

const UserPage = () => {
  const [news, dispatch] = useReducer(reducer, initialState);
  const params = useParams();

  return (
    <>
      <NewsContext.Provider value={{ news, dispatch }}>
        <ProfileComponent username={params.name} />
      </NewsContext.Provider>
    </>
  );
};

export default UserPage;
