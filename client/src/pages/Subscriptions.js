import React, { useState } from "react";
import Table from "../components/Table";
import Card from "../components/Card";
import useFund from "../hooks/useFund";
import colors from "../styles/color";
import notification from "../styles/notification";
import postOpenFund from "../api/postOpenFund";

const Subscriptions = () => {
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const columns = ["nombre", "categoria", "montoMinimo"];

  const { fund, loading, error } = useFund();

  const handleSubscriptions = async (_id) => {
    const data = await postOpenFund({
      usarioId: "6701af42e1b6aa27ecf82c03",
      fondoId: _id,
      tipo: "apertura",
      monto: 500000,
    });

    if (data.error) {
      setHasError(true);
      return setMessage(data.message);
    }

    setMessage(`${data.message} para el fondo ${data.fondo.nombre}`);
  };

  if (loading) {
    return <p>Cargando Fondos a Subscribir...</p>;
  }

  if (error) {
    return <p> Error cargando los fondos a subscriptos: {error}</p>;
  }

  return (
    <div style={{ padding: "20px", backgroundColor: colors.background }}>
      <h1>Subscripción de Fondos</h1>
      <Card title="Fondos a Subscribir">
        {fund.length === 0 ? (
          <p> No hay fondos a Subscribir disponibles </p>
        ) : (
          <>
            {message && (
              <div
                style={{
                  ...notification,
                  backgroundColor: hasError
                    ? colors.danger
                    : notification.backgroundColor,
                }}
              >
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
          </>
        )}
      </Card>
    </div>
  );
};

export default Subscriptions;
