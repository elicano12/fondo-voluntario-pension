import axios from "axios";
import conf from "../conf";

const getFondos = async (id) => {
  try {
    const apiUrl = `${conf.apiUrl}/transacciones/usuarioId`;
    const response = await axios.get(apiUrl, {
      params: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error encontrando el fondo:", error);
    throw error;
  }
};

export default getFondos;
