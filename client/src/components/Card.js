// src/components/Card.js
import React from "react";
import colors from "../styles/color";

const Card = ({ title, children }) => {
  const styles = {
    backgroundColor: colors.white,
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "50px",
  };

  return (
    <div style={styles}>
      {title && <h3 style={{ color: colors.primary }}>{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
