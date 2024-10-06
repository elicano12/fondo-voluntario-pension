import { useState, useEffect } from "react";
import getHistorialFondos from "../api/getHistorialFondos";
import getUsuarioById from "../api/getUsusarios";
import getFondoById from "../api/getFondosById"

const useHistorialFondos = () => {
  const [historialFondos, setHistorialFondos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistorial = async () => {
    try {
      setLoading(true);
      const historialData = await getHistorialFondos();

      const historialFondoFix = await Promise.all(
        historialData.map( async (fondo) => {
          const usuario = await getUsuarioById(fondo.usuarioId);
          const fondos = await getFondoById(fondo.fondoId);
          
          return {
            ...fondo,
            usuario: usuario.nombre,
            fondo: fondos.nombre,
          };
        })
      );

      setHistorialFondos(historialFondoFix);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistorial();
  }, []);

  return { historialFondos, loading, error };
};

export default useHistorialFondos;
