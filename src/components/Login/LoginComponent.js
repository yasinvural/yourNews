import React, { useState } from "react";
import {
  Snackbar,
  SnackbarContent,
  Button,
  TextField,
  Paper
} from "@material-ui/core";
import { login } from "../../services/AccountService";

const paperContainerStyle = {
  width: "35%",
  margin: " 10% auto",
  padding: "4% 0"
};

const LoginComponent = ({history}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const loginSubmit = e => {
    e.preventDefault();
    const result = login({
      username,
      password,
      rememberMe: false
    });
    result
      .then(data => {
        let { id_token } = data.data;
        id_token = "dXNlcjp1c2Vy";
        localStorage.setItem("token", id_token);
        setShowSuccess(true);
      })
      .catch(err => {
        setShowError(true);
      });
  };

  const handleUsernameChange = e => {
    const username = e.target.value;
    setUsername(username);
  };

  const handlePasswordChange = e => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    history.push('/');
  }

  return (
    <>
      <Paper
        style={paperContainerStyle}
        className="flex flex-column align-center"
      >
        <div className="mt1">
          <div>Your News</div>
        </div>
        <div className="mt2 mb1">
          <form onSubmit={loginSubmit}>
            <div className="mt1">
              <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="mt1">
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="mt1 textAlignRight">
              <Button
                variant="contained"
                color="primary"
                size="small"
                type="submit"
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </Paper>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={showError}
        autoHideDuration={1200}
        onClose={handleCloseError}
      >
        <SnackbarContent variant="error" message={<span>Error</span>} />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={showSuccess}
        autoHideDuration={1200}
        onClose={handleCloseSuccess}
      >
        <SnackbarContent variant="success" message={<span>Success</span>} />
      </Snackbar>
    </>
  );
};

export default LoginComponent;
