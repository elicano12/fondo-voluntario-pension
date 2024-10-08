// src/components/Notification.js
import React from "react";
import colors from "../styles/color";

const Notification = ({ message, type }) => {
  const styles = {
    padding: "10px 20px",
    margin: "10px 0",
    borderRadius: "5px",
    backgroundColor: type === "success" ? colors.success : colors.danger,
    color: colors.white,
    fontWeight: "bold",
  };

  return <div style={styles}>{message}</div>;
};

export default Notification;
