import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import models from "../../context/models";
import "../../styles/global.scss";

const EditItemButton = ({ activeTab, itemData, onEdit }) => {
  const [userRole, setUserRole] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  useEffect(() => {
    if (showModal && itemData) {
      reset();
      models[activeTab]?.forEach((field) => {
        if (itemData[field.name] !== undefined) {
          let value = itemData[field.name];
  
          if (field.type === "date" && typeof value === "string") {
            const [day, month, year] = value.split("-");
            value = `${year}-${month}-${day}`;
          }
  
          setValue(field.name, value);
        }
      });
    }
  }, [showModal, itemData, activeTab, reset, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

  const allowedFields = models[activeTab].map(field => field.name);
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([key]) => allowedFields.includes(key))
  );

    let url = "";
    let method = "PUT";
    
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No se encontró el token. Debes estar identificado.");
      navigate("/login");
      return;
    }

    if (userRole === "recepcion" && ["habitaciones", "servicios"].includes(activeTab)) {
      setErrorMessage("No tienes el rol necesario para editar este elemento. Contacta con el gerente.");
      setIsSubmitting(false);
      return;
    }

    switch (activeTab) {
      case "clientes":
        url = `https://oceandb-server.vercel.app/api/v1/clientes/update/${itemData.id}`;
        break;
      case "habitaciones":
        url = `https://oceandb-server.vercel.app/api/v1/habitaciones/update/${itemData.id}`;
        break;
      case "reservas":
        url = `https://oceandb-server.vercel.app/api/v1/reservas/update/${itemData.id}`;
        break;
      case "servicios":
        url = `https://oceandb-server.vercel.app/api/v1/servicios/update/${itemData.id}`;
        break;
      case "servicio_reserva":
        url = `https://oceandb-server.vercel.app/api/v1/servicio_reserva/update/${itemData.id}`;
        break;
      case "facturas":
        url = `https://oceandb-server.vercel.app/api/v1/facturas/update/${itemData.id}`;
        break;
      default:
        console.error("La dirección de la petición no es válida.");
        return;
    }

    try {
      const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(filteredData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage("No estás autorizado o ha ocurrido un error.");
        throw new Error("No estás autorizado o ha ocurrido un error.");
      } else {
        setSuccessMessage("Elemento editado con éxito.");
      }

      if (typeof onEdit === 'function') {
        onEdit();
      }
      setShowModal(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isRestricted = userRole === "recepcion" && ["habitaciones", "servicios", "facturas"].includes(activeTab);

  return (
    <>
      <button
        className="edit-btn"
        onClick={() => setShowModal(true)}
        disabled={isRestricted}
      >
        ✏️
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>✏️ Editar {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            {successMessage && <div className="success-message">{successMessage}</div>}

            <form onSubmit={handleSubmit(onSubmit)}>
              {models[activeTab]?.map((field) => (
                <div key={field.name}>
                  <label>{field.label}</label>
                  {field.type === "select" ? (
                    <select {...register(field.name, field.validation)} autoComplete={field.autoComplete || "off"}>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      {...register(field.name, field.validation)}
                      type={field.type || "text"}
                      autoComplete={field.autoComplete || "on"}
                    />
                  )}
                  {errors[field.name] && <span>{errors[field.name].message}</span>}
                </div>
              ))}

              <button className="confirmation-button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Guardar cambios"}
              </button>
            </form>
            <button className="cancel-button" onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditItemButton;