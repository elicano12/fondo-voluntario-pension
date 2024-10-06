import axios from "axios";
import conf from "../conf";

const postAperturaFondos = async ({ usarioId, fondoId, tipo, monto }) => {
  try {
    const apiUrl = `${conf.apiUrl}/transacciones/apertura-fondos`;
    const response = await axios.post(apiUrl, {
      usuarioId: usarioId,
      fondoId: fondoId,
      tipo: tipo,
      monto: monto,
    });
    return response.data;
  } catch (error) {
    console.error("Error al suscribirse al fondo:", error);
    throw error;
  }
};

export default postAperturaFondos;
