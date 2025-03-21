import React from "react";
import DeleteItemButton from "./DeleteItemButton";
import EditItemButton from "./EditItemButton";
import "../../styles/dashboard/dataTable.scss";

const DataTable = ({ headers, data, headerMappings, onEditSuccess, onDeleteSuccess, activeTab }) => {

const getEstadoClass = (estado) => {
  if (estado === "Disponible") return "estado-disponible";
  if (estado === "Ocupada") return "estado-ocupada";
  if (estado === "pendiente") return "estado-pendiente";
  if (estado === "pagado") return "estado-pagado";
  return "";
};

  return (
    <div className="data-table-container">
      {data.length === 0 ? (
        <div className="no-data">Esta entidad no tiene datos disponibles</div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{headerMappings?.[header] || header}</th>
              ))}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.keys(row).map((key, idx) => (
                  <td key={idx} className={key === "estado" && (row[key] === "Disponible" || row[key] === "Ocupada" || row[key] === "pendiente" || row[key] === "pagado") ? getEstadoClass(row[key]) : ""}>
                    {row[key]}
                  </td>
                ))}
                <td>
                  <EditItemButton
                  activeTab={activeTab}
                  itemData={row}
                  onEdit={onEditSuccess}
                  />
                  <DeleteItemButton
                  activeTab={activeTab}
                  itemId={row.id}
                  onDeleteSuccess={onDeleteSuccess}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DataTable;