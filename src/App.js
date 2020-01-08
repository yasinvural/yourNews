import React from "react";
import { Route } from "react-router-dom";
import MainPage from "./pages/Main/MainPage";
import UserPage from "./pages/User/UserPage";
import NewsDetailComponent from "./components/NewsDetail/NewsDetailComponent";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import AuthenticationHOC from "./hoc/AuthenticationHOC";

const App = () => {
  return (
    <>
      <Route exact path="/" component={AuthenticationHOC(MainPage)} />
      <Route path="/news/:id" component={NewsDetailComponent} />
      <Route path="/user/:name" component={AuthenticationHOC(UserPage)} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
    </>
  );
};

export default App;
