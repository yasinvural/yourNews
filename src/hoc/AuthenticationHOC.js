import React, { Component } from "react";
import userManager from "../utils/userManager";

export default function(ComposedComponent) {
  class AuthenticationHOC extends Component {
    render() {
      const token = userManager.getItem("token");
      if (!token) {
        this.props.history.push("/login");
        return null;
      } else {
        return <ComposedComponent {...this.props} />;
      }
    }
  }

  return AuthenticationHOC;
}
