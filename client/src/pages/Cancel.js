import React, { useState } from "react";
import Table from "../components/Table";
import useFundSubscription from "../hooks/useFundSubscription";
import colors from "../styles/color";
import notification from "../styles/notification";
import postCancelFund from "../api/postCancelFund";

const CancelFund = () => {
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [reload, setReload] = useState(false)
  // const [fund, setFund] = useState(null);
  // const [loading, setLoading] = useState(null);
  // const [error, setError] = useState(null);

  const columns = ["usuario", "fondo", "tipo", "monto", "fecha"];

  const { fund, loading, error } = useFundSubscription({
    id: "6701af42e1b6aa27ecf82c03",
  }, reload);

  const handleCancel = async (_id) => {
    const data = await postCancelFund({
      usarioId: "6701af42e1b6aa27ecf82c03",
      fondoId: _id,
    });
    
    if (data.error) {
      setHasError(true);
      return setMessage(data.message);
    }

    setMessage(`${data.message} para el fondo ${data.fondo.nombre}`);
    setReload(!reload);
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Ocurrió un error: {error}</p>;
  }

  return (
    <div style={{ padding: "20px", backgroundColor: colors.background }}>
      <h1>Gestión de Cancelación de Fondos</h1>
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
          onSuscribir={null}
          onCancelar={handleCancel}
        />
      </div>
    </div>
  );
};

export default CancelFund;
