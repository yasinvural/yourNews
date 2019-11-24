import React, { useState } from "react";
import { register } from "../../services/AccountService";
import { Snackbar, Button, TextField, Paper } from "@material-ui/core";
import SnackbarContentComponent from "../../shared/components/SnackbarContentComponent";

const paperContainerStyle = {
  width: "35%",
  margin: "10% auto",
  padding: "4% 0"
};

const RegisterComponent = ({ history }) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const registerSubmit = e => {
    e.preventDefault();
    const result = register({ login, email, password });
    result
      .then(data => {
        setShowSuccess(true);
      })
      .catch(err => {
        setShowError(true);
      });
  };

  const handleLoginChange = e => {
    const login = e.target.value;
    setLogin(login);
  };

  const handleEmailChange = e => {
    const email = e.target.value;
    setEmail(email);
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
    history.push("/login");
  };

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
          <form onSubmit={registerSubmit}>
            <div className="mt1">
              <TextField
                label="Username"
                variant="outlined"
                value={login}
                onChange={handleLoginChange}
              />
            </div>
            <div className="mt1">
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
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
                Sign up
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
        <SnackbarContentComponent variant="error" message="Error" />
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
        <SnackbarContentComponent variant="success" message="Success" />
      </Snackbar>
    </>
  );
};

export default RegisterComponent;
