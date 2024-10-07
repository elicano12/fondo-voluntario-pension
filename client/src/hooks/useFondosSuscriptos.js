import { useState, useEffect } from "react";
import getFondosSuscriptos from "../api/getFondosSuscriptos";
import getUsuarioById from "../api/getUsusarios";
import getFondoById from "../api/getFondosById"

const useFondosSuscriptos = ({id}) => {
  const [fondos, setFondos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFondosSuscriptos = async (id) => {
    try {
      setLoading(true);
      const fondos = await getFondosSuscriptos(id);

      const fondoFix = await Promise.all(
        fondos.map( async (fondo) => {
          const usuario = await getUsuarioById(fondo.usuarioId);
          const fondos = await getFondoById(fondo.fondoId);
          
          return {
            ...fondo,
            usuario: usuario.nombre,
            fondo: fondos.nombre,
          };
        })
      );

      setFondos(fondoFix);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFondosSuscriptos(id);
  }, [id]);

  return { fondos, loading, error };
};

export default useFondosSuscriptos;
