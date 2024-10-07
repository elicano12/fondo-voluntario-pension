import React, { useState } from "react";
import Table from "../components/Table";
import useFund from "../hooks/useFund";
import colors from "../styles/color";
import notification from "../styles/notification";
import postOpenFund from "../api/postOpenFund";

const Subscriptions = () => {
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false)
  const columns = ["nombre", "categoria", "montoMinimo"];

  const { fund, loading, error } = useFund();

  const handleSubscriptions = async (_id) => {
    const data = await postOpenFund({
      usarioId: "6701af42e1b6aa27ecf82c03",
      fondoId: _id,
      tipo: "apertura",
      monto: 300000,
    });

  if (data.error) {
    setHasError(true);
    return setMessage(data.message);
  }

    setMessage(`${data.message} para el fondo ${data.fondo.nombre}`);
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Ocurrió un error: {error}</p>;
  }

  return (
    <div style={{ padding: "20px", backgroundColor: colors.background }}>
      <h1>Gestión de Suscripción de Fondos</h1>
      {message && (
        <div style={{...notification, backgroundColor: hasError? colors.danger : notification.backgroundColor }}>
          <span>{message}</span>
        </div>
      )}
      <div className="table-container">
        <Table
          data={fund}
          columns={columns}
          onSuscribir={handleSubscriptions}
          onCancelar={null}
        />
      </div>
    </div>
  );
};

export default Subscriptions;