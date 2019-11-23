import React, { Component } from "react";

export default function(ComposedComponent) {
  class AuthenticationHOC extends Component {
    render() {
      const token = localStorage.getItem("token");
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
