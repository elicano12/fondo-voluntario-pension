import React from "react";
import Card from "../components/Card";
import Table from "../components/Table";
import colors from "../styles/color";
import useHistoryFund from "../hooks/useHistoryFund";

const History = () => {

  const { historyFund, loading, error } = useHistoryFund();

  const columns = ["usuario", "fondo", "tipo", "monto", "fecha"];

  if (loading) {
    return <p>Cargando el historial de fondos...</p>;
  }

  if (error) {
    return <p>Error cargando el historial de fondos: {error}</p>;
  }

  return (
    <div style={{ padding: "20px", backgroundColor: colors.background }}>
      <h1>Historial de Fondos</h1>
      <Card title="Historial de Transacciones">
        {historyFund.length === 0 ? (
          <p> No hay transacciones disponibles </p>
        ) : (
          <Table
            data={historyFund}
            columns={columns}
            onSuscribir={null}
            onCancelar={null}
          />
        )}
      </Card>
    </div>
  );
};

export default History;
