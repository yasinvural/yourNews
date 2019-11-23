import React from "react";
import { Route, withRouter } from "react-router-dom";
import MainPage from "./pages/Main/MainPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import AuthenticationHOC from "./hoc/AuthenticationHOC";

function App() {
  return (
    <>
      <Route exact path="/" component={AuthenticationHOC(MainPage)} />
      <Route path="/login" component={withRouter(LoginPage)} />
      <Route path="/register" component={withRouter(RegisterPage)} />
    </>
  );
}

export default App;
