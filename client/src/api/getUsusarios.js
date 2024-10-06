import axios from "axios";
import conf from "../conf";

const getUsuarioById = async (id) => {
  try {
    const apiUrl = `${conf.apiUrl}/usuarios/usuario-id`;
    const response = await axios.get(apiUrl, {
      params: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error encontrando el usuario:", error);
    throw error;
  }
};

export default getUsuarioById;
