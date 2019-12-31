import React from "react";
import { Route } from "react-router-dom";
import MainPage from "./pages/Main/MainPage";
import UserPage from "./pages/User/UserPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import AuthenticationHOC from "./hoc/AuthenticationHOC";

function App() {
  return (
    <>
      <Route exact path="/" component={AuthenticationHOC(MainPage)} />
      <Route path="/user/:name" component={AuthenticationHOC(UserPage)} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
    </>
  );
}

export default App;
