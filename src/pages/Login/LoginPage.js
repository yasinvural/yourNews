import React from 'react';
import LoginComponent from '../../components/Login/LoginComponent';

const LoginPage = (props) => {
  return <LoginComponent history={props.history} />;
};

export default LoginPage;
