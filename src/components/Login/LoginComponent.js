import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Snackbar, Button, TextField, Paper } from "@material-ui/core";
import SnackbarContentComponent from "../../shared/components/SnackbarContent/SnackbarContentComponent";
import LoadingSpinnerComponent from "../../shared/components/LoadingSpinner/LoadingSpinnerComponent";
import { loginUser } from "../../services/AccountService";

const paperContainerStyle = {
  width: "35%",
  margin: " 10% auto",
  padding: "4% 0"
};

const LoginComponent = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const loginSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await loginUser({
        username,
        password,
        rememberMe: false
      });
      const { id_token, user } = result.data;
      const { id, imageUrl, firstName, lastName, login } = user;
      localStorage.setItem("token", id_token);
      localStorage.setItem(
        "user",
        JSON.stringify({ id, imageUrl, firstName, lastName, login })
      );
      setShowSuccess(true);
      setLoading(false);
    } catch (err) {
      setShowError(true);
      setLoading(false);
    }
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
        <div className="margin-top-1">
          <div>Your News</div>
        </div>
        <div className="margin-top-2 margin-bottom-1">
          <form onSubmit={loginSubmit}>
            <div className="margin-top-1">
              <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="margin-top-1">
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="flex margin-top-1">
              <div className="flex-1">
                <Button color="primary" onClick={handleGoToRegisterPage}>
                  Sign up
                </Button>
              </div>
              <div className="flex-1 text-align-right">
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
