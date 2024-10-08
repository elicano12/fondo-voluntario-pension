import axios from "axios";
import conf from "../conf";

const getUserById = async (id) => {
  try {
    const apiUrl = `${conf.apiUrl}/usuarios/usuarioId/${id}`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error encontrando el usuario:", error);
    throw error;
  }
};

export default getUserById;
