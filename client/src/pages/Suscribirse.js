import React, { useState } from "react";
import Table from "../components/Table";
import useFondos from "../hooks/useFondos";
import colors from "../styles/color";
import postAperturaFondos from "../api/postAperturaFondos";
import postCancelacionFondo from "../api/postCancelacionFondo";

const Suscribirse = () => {
    const [mensaje, setMensaje] = useState("");
  const columns = ["nombre", "categoria", "montoMinimo"];

  const { fondos, loading, error } = useFondos();

  const handleSuscribirse = async (_id) => {
    const data = await postAperturaFondos({usarioId:"6701af42e1b6aa27ecf82c03",fondoId:_id, tipo: "apertura", monto: 400000});
    setMensaje(`${data.message} para el fondo ${data.fondo.nombre}`);
  };

  const handleCancelar = async (_id) => {
    const data = await postCancelacionFondo({ usarioId:"6701af42e1b6aa27ecf82c03", fondoId:_id,});
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
      <h1>Gestión de Fondos</h1>
      {mensaje && <p className="message">{mensaje}</p>}
      <div className="table-container">
        <Table
          data={fondos}
          columns={columns}
          onSuscribir={handleSuscribirse}
          onCancelar={handleCancelar}
        />
      </div>
    </div>
  );
};

export default Suscribirse;
