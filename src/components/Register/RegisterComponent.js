import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../services/AccountService";
import { Snackbar, Button, TextField, Paper } from "@material-ui/core";
import SnackbarContentComponent from "../../shared/components/SnackbarContent/SnackbarContentComponent";
import LoadingSpinnerComponent from "../../shared/components/LoadingSpinner/LoadingSpinnerComponent";

const paperContainerStyle = {
  width: "35%",
  margin: "10% auto",
  padding: "4% 0"
};

const RegisterComponent = () => {
  const history = useHistory();
  const [loading, setLoading] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const registerSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await registerUser({ login, email, password });
      setShowSuccess(true);
      setLoading(false);
    } catch (err) {
      setShowError(true);
      setLoading(false);
    }
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
        <div className="margin-top-1">
          <div>Your News</div>
        </div>
        <div className="margin-top-2 margin-bottom-1">
          <form onSubmit={registerSubmit}>
            <div className="margin-top-1">
              <TextField
                label="Username"
                variant="outlined"
                value={login}
                onChange={handleLoginChange}
              />
            </div>
            <div className="margin-top-1">
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
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
            <div className="margin-top-1 text-align-right">
              <Button
                variant="contained"
                color="primary"
                size="small"
                type="submit"
              >
                {loading ? <LoadingSpinnerComponent /> : <>Sign up</>}
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

export default RegisterComponent;
