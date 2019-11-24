import React, { useState } from "react";
import { Snackbar, Button, TextField, Paper } from "@material-ui/core";
import SnackbarContentComponent from "../../shared/components/SnackbarContent/SnackbarContentComponent";
import LoadingSpinnerComponent from "../../shared/components/LoadingSpinner/LoadingSpinnerComponent";
import { login } from "../../services/AccountService";

const paperContainerStyle = {
  width: "35%",
  margin: " 10% auto",
  padding: "4% 0"
};

const LoginComponent = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const loginSubmit = e => {
    e.preventDefault();
    setLoading(true);
    const result = login({
      username,
      password,
      rememberMe: false
    });
    result
      .then(data => {
        let { id_token } = data.data;
        localStorage.setItem("token", id_token);
        setShowSuccess(true);
        setLoading(false);
      })
      .catch(err => {
        setShowError(true);
        setLoading(false);
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
    history.push("/");
  };

  const handleGoToRegisterPage = () => {
    history.push("/register");
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
            <div className="flex mt1">
              <div className="flex1">
                <Button color="primary" onClick={handleGoToRegisterPage}>
                  Sign up
                </Button>
              </div>
              <div className="flex1 textAlignRight">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <LoadingSpinnerComponent /> : <>Login</>}
                </Button>
              </div>
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
        autoHideDuration={1000}
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
        autoHideDuration={1000}
        onClose={handleCloseSuccess}
      >
        <SnackbarContentComponent variant="success" message="Success" />
      </Snackbar>
    </>
  );
};

export default LoginComponent;
