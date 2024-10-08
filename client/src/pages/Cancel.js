import React, { useState } from "react";
import Table from "../components/Table";
import Card from "../components/Card";
import useFundSubscription from "../hooks/useFundSubscription";
import colors from "../styles/color";
import notification from "../styles/notification";
import postCancelFund from "../api/postCancelFund";

const CancelFund = () => {
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [reload, setReload] = useState(false);

  const columns = ["usuario", "fondo", "tipo", "monto", "fecha"];

  const { fund, loading, error } = useFundSubscription(
    {
      id: "6701af42e1b6aa27ecf82c03",
    },
    reload
  );

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
    return <p>Cargando Fondos Subscriptos...</p>;
  }

  if (error) {
    return <p> Error cargando los fondos subscriptos: {error}</p>;
  }

  return (
    <div style={{ padding: "20px", backgroundColor: colors.background }}>
      <h1>Fondos Subscriptos</h1>
      <Card title="Fondos Subscriptos">
        {fund.length === 0 ? (
          <p> No hay fondos Subscritos disponibles </p>
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
                onSuscribir={null}
                onCancelar={handleCancel}
              />
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default CancelFund;
