// src/components/Table.js
import React from "react";
import colors from "../styles/color";
import Button from "./Button";

const Table = ({ data, columns, onSuscribir, onCancelar }) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col}
              style={{
                padding: "10px",
                backgroundColor: colors.primary,
                color: colors.white,
              }}
            >
              {col}
            </th>
          ))}
          {onSuscribir && onCancelar ? (
            <th
              style={{
                padding: "10px",
                backgroundColor: colors.primary,
                color: colors.white,
              }}
            >
              Acciones
            </th>
          ) : (
            <> </>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td
                key={col}
                style={{
                  padding: "10px",
                  borderBottom: `1px solid ${colors.secondary}`,
                }}
              >
                {row[col]}
              </td>
            ))}
            {onSuscribir && onCancelar ? (
              <td
                style={{
                  padding: "10px",
                  borderBottom: `1px solid ${colors.secondary}`,
                  textAlign: "center",
                }}
              >
                <div>
                  <Button label={"Suscribir"} onClick={() => onSuscribir(row._id)}>Suscribir</Button>
                </div>
                <div>
                  <Button label={"Cancelar"} onClick={() => onCancelar(row._id)}>Cancelar</Button>
                </div>
              </td>
            ) : (
              <> </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
