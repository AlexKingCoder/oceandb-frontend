import { useState, useEffect } from "react";
import "../../styles/dashboard/deleteItemButton.scss";

const DeleteItemButton = ({ activeTab, itemId, onDeleteSuccess }) => {
  const [userRole, setUserRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserRole(payload.rol);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, []);

  const getDeleteUrl = (activeTab, id) => {

    switch (activeTab) {
      case "clientes":
        return `https://oceandb-server.vercel.app/api/v1/clientes/delete/${id}`;
      case "habitaciones":
        return `https://oceandb-server.vercel.app/api/v1/habitaciones/delete/${id}`;
      case "reservas":
        return `https://oceandb-server.vercel.app/api/v1/reservas/delete/${id}`;
      case "servicios":
        return `https://oceandb-server.vercel.app/api/v1/servicios/delete/${id}`;
      case "servicio_reserva":
        return `https://oceandb-server.vercel.app/api/v1/servicio_reserva/delete/${id}`;
      case "facturas":
        console.warn("La eliminación de facturas no está permitida.");
        return null;
      default:
        console.error("Tipo no válido:", type);
        return null;
    }
  };

  const handleDelete = async () => {
    const url = getDeleteUrl(activeTab, itemId);
    if (!url) return;

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No se encontró el token. Debes estar identificado.");
      navigate("/login");
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Error al eliminar el elemento.");

      onDeleteSuccess(itemId);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Se ha producido un error al intentar borrar:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const isRestricted = userRole === "recepcion" && ["habitaciones", "servicios", "facturas"].includes(activeTab);

  return (
    <>
      <button
        className="delete-btn"
        onClick={() => setIsModalOpen(true)}
        disabled={isRestricted}
      >
        🗑️
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>¿Estás seguro de que quieres eliminar este elemento?</p>
            <div>
              <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </button>
              <button 
                className="confirm-btn" 
                onClick={handleDelete} 
                disabled={isDeleting}
              >
                {isDeleting ? "Eliminando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteItemButton;