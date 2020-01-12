import React, { useReducer } from "react";
import { Route } from "react-router-dom";
import MainPage from "./pages/Main/MainPage";
import UserPage from "./pages/User/UserPage";
import NewsDetailComponent from "./components/NewsDetail/NewsDetailComponent";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import AuthenticationHOC from "./hoc/AuthenticationHOC";
import AppBarComponent from "./components/AppBar/AppBarComponent";
import { NewsContext } from "./context/NewsContext";
import { initialState, reducer } from "./reducer/NewsReducer";

const App = () => {
  const [news, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <NewsContext.Provider value={{ news, dispatch }}>
        <Route path="/" component={AppBarComponent} />
        <Route exact path="/" component={MainPage} />
        <Route path="/news/:id" component={NewsDetailComponent} />
        <Route path="/user/:name" component={AuthenticationHOC(UserPage)} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </NewsContext.Provider>
    </>
  );
};

export default App;
