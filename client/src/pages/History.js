import React from "react";
import Card from "../components/Card";
import Table from "../components/Table";
import useHistoryFund from "../hooks/useHistoryFund";

const History = () => {
  const { historyFund, loading, error } = useHistoryFund();

  const columns = ["usuario", "fondo", "tipo", "monto", "fecha"];

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Ocurrió un error: {error}</p>;
  }

  return (
    <div>
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
