import React from "react";
import { CircularProgress } from "@material-ui/core";

const styles = {
  primaryButton: {
    width: "20px",
    height: "20px",
    color: "#FFFFFF"
  }
};

const LoadingSpinnerComponent = () => {
  return <CircularProgress style={styles.primaryButton} />;
};

export default LoadingSpinnerComponent;
