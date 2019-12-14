import React from "react";
import { Route, withRouter } from "react-router-dom";
import MainPage from "./pages/Main/MainPage";
import UserPage from "./pages/User/UserPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import AuthenticationHOC from "./hoc/AuthenticationHOC";

function App() {
  return (
    <>
      <Route
        exact
        path="/"
        component={AuthenticationHOC(withRouter(MainPage))}
      />
      <Route
        path="/user/:name"
        component={AuthenticationHOC(withRouter(UserPage))}
      />
      <Route path="/login" component={withRouter(LoginPage)} />
      <Route path="/register" component={withRouter(RegisterPage)} />
    </>
  );
}

export default App;
