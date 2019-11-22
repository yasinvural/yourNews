import React, { Component } from "react";
import { baseService } from "../../services/BaseService";

class LoginContainer extends Component {
  componentDidMount() {
    // baseService.get('/users?pageNumber=1&pageSize=20');
    baseService.post("authenticate", {
      password: "123",
      username: "123",
      rememberMe: true
    });
  }

  render() {
    return <>login container</>;
  }
}

export default LoginContainer;
