import React from "react";
import { SnackbarContent } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";

const styles = {
  error: {
    backgroundColor: "red"
  },
  success: {
    backgroundColor: "green"
  }
};

const variantIcon = {
  error: ErrorIcon,
  success: CheckCircleIcon
};

const SnackbarContentComponent = ({ variant, message }) => {
  const Icon = variantIcon[variant];
  return (
    <>
      <SnackbarContent
        style={styles[variant]}
        message={
          <span className="flex align-center">
            <Icon />
            <span className="margin-left-1">{message}</span>
          </span>
        }
      />
    </>
  );
};

export default SnackbarContentComponent;
