import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Subscriptions from "./pages/Subscriptions";
import History from "./pages/History";
import CancelFund from "./pages/Cancel";
import colors from "./styles/color";

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex", backgroundColor: colors.background }}>
        <Sidebar />
        <div style={{ padding: "20px", width: "100%" }}>
          <Routes>
            <Route path="/" element={<Subscriptions />} />
            <Route path="/gestion-fondos" element={<Subscriptions />} />
            <Route path="/gestion-fondos-cancelar" element={<CancelFund />} />
            <Route path="/historial" element={<History />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
