// src/components/Button.js
import React from "react";
import colors from "../styles/color";

const Button = ({ label, onClick, type = "primary", disabled }) => {
  const styles = {
    backgroundColor: colors[type],
    color: colors.white,
    padding: "10px 25px",
    border: "none",
    borderRadius: "5px",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "10px",
  };

  return (
    <button style={styles} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
