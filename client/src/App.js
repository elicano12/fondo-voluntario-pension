import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Suscribirse from "./pages/Suscribirse";
import Historial from "./pages/Historial";
import Cancelar from "./pages/Cancelar";
import colors from "./styles/color";

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex", backgroundColor: colors.background }}>
        <Sidebar />
        <div style={{ padding: "20px", width: "100%" }}>
          <Routes>
            <Route path="/" element={<Suscribirse />} />
            <Route path="/gestion-fondos" element={<Suscribirse />} />
            <Route path="/gestion-fondos-cancelar" element={<Cancelar />} />
            <Route path="/historial" element={<Historial />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
