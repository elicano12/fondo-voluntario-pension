import { useState, useEffect } from "react";
import getFundSubscription from "../api/getFundSubscription";
import getUserById from "../api/getUsers";
import getFundById from "../api/getFundById";
import { formatDate } from "../conf";

const useFundSubscription
 = ({id}, flag) => {
  const [fund, setFFund] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFundSubscription = async (id) => {
    try {
      setLoading(true);
      const funds = await getFundSubscription(id);

      const fundFix = await Promise.all(
        funds.map( async (fund) => {
          const users = await getUserById(fund.usuarioId);
          const funds = await getFundById(fund.fondoId);
          
          return {
            ...fund,
            usuario: users.nombre,
            fondo: funds.nombre,
            fecha: formatDate(funds.fecha)
          };
        })
      );

      setFFund(fundFix);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFundSubscription(id);
  }, [id, flag]);

  return { fund, loading, error };
};

export default useFundSubscription
;
