// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import colors from "../styles/color";

const Sidebar = () => {
  const styles = {
    backgroundColor: colors.primary,
    height: "100vh",
    padding: "20px",
    color: colors.white,
  };

  const menuItemStyle = {
    padding: "10px 0",
    cursor: "pointer",
    color: colors.white,
    textDecoration: "none",
    display: "block",
  };

  return (
    <div style={styles}>
      <h2>Menú</h2>
      <Link to="/gestion-fondos" style={menuItemStyle}>Suscribir</Link>
      <Link to="/gestion-fondos-cancelar" style={menuItemStyle}>Cancelar</Link>
      <Link to="/historial" style={menuItemStyle}>Historial</Link>
    </div>
  );
};

export default Sidebar;
