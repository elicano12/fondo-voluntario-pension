// src/components/Table.js
import React from "react";
import colors from "../styles/color";
import Button from "./Button";

const Table = ({ data, columns, onSuscribir, onCancelar }) => {
  console.log(data)
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
          {onSuscribir == null && onCancelar == null ? (
            <></>
          ) : (
            <th
              style={{
                padding: "10px",
                backgroundColor: colors.primary,
                color: colors.white,
              }}
            >
              Acciones
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        { data.length !== 0 ? (data.map((row, index) => (
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
            {(onSuscribir == null && onCancelar) ? (
              <td
              style={{
                padding: "10px",
                borderBottom: `1px solid ${colors.secondary}`,
                textAlign: "center",
              }}
            >
              <div>
                <Button
                  label={"Cancelar"}
                  onClick={() => onCancelar(row.fondoId)}
                >
                  Cancelar
                </Button>
              </div>
            </td>
            ) : (
              <></>
            )}
            {(onSuscribir && onCancelar==null) ? (
              <td
              style={{
                padding: "10px",
                borderBottom: `1px solid ${colors.secondary}`,
                textAlign: "center",
              }}
            >
              <div>
                <Button
                  label={"Suscribir"}
                  onClick={() => onSuscribir(row._id)}
                >
                  Suscribir
                </Button>
              </div>
            </td>
            ) : (
              <></>
            )}
          </tr>
        ))) : (
          <h3>
            No hay fondos subscriptos
          </h3>
        )}
      </tbody>
    </table>
  );
};

export default Table;
