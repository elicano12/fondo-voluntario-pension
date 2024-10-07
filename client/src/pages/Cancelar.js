import React, { useState } from "react";
import Table from "../components/Table";
import useFondosSuscriptos from "../hooks/useFondosSuscriptos";
import colors from "../styles/color";
import postCancelacionFondo from "../api/postCancelacionFondo";

const CancelarFondos = () => {
  const [mensaje, setMensaje] = useState("");
  const columns = ["usuario", "fondo", "tipo", "monto", "fecha"];

  const { fondos, loading, error } = useFondosSuscriptos({id:"6701af42e1b6aa27ecf82c03"});

  const handleCancelar = async (_id) => {
    const data = await postCancelacionFondo({
      usarioId: "6701af42e1b6aa27ecf82c03",
      fondoId: _id,
    });
    setMensaje(`${data.message} para el fondo ${data.fondo.nombre}`);
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
      {mensaje && <p className="message">{mensaje}</p>}
      <div className="table-container">
        <Table
          data={fondos}
          columns={columns}
          onSuscribir={null}
          onCancelar={handleCancelar}
        />
      </div>
    </div>
  );
};

export default CancelarFondos;
