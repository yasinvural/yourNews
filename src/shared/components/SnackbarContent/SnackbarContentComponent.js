import React from "react";
import { SnackbarContent } from "@material-ui/core";

const styles = {
  error: {
    backgroundColor: "red"
  },
  success: {
    backgroundColor: "green"
  }
};

const SnackbarContentComponent = ({ variant, message }) => {
  return (
    <>
      <SnackbarContent
        style={styles[variant]}
        message={<span>{message}</span>}
      />
    </>
  );
};

export default SnackbarContentComponent;
