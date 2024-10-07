import { useState, useEffect } from "react";
import getHistoryFund from "../api/getHistoryFund";
import getUserById from "../api/getUsers";
import getFundById from "../api/getFundById";
import { formatDate } from "../conf";

const useHistoryFund = () => {
  const [historyFund, sethistoryFund] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const historyData = await getHistoryFund();

      const historyFundFix = await Promise.all(
        historyData.map(async (fund) => {
          const user = await getUserById(fund.usuarioId);
          const funds = await getFundById(fund.fondoId);

          return {
            ...fund,
            usuario: user.nombre,
            fondo: funds.nombre,
            fecha: formatDate(funds.fecha),
          };
        })
      );

      sethistoryFund(historyFundFix);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return { historyFund, loading, error };
};

export default useHistoryFund;
