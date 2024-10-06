import axios from "axios";
import conf from "../conf";

const postCancelacionFondo = async ({ usarioId, fondoId }) => {
  try {
    const apiUrl = `${conf.apiUrl}/transacciones/cancelacion-fondos`;
    const response = await axios.post(apiUrl, {
      usuarioId: usarioId,
      fondoId: fondoId,
    });
    return response.data;
  } catch (error) {
    console.error("Error al cancelar el fondo:", error);
    throw error;
  }
};

export default postCancelacionFondo;
