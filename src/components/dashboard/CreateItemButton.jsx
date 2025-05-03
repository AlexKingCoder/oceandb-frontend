import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import models from "../../context/models";
import "../../styles/global.scss";
import "../../styles/dashboard/createItemButton.scss";

const CreateItemModal = ({ activeTab, onClose, onCreate, userRole }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No se encontró el token. Debes estar identificado.");
      navigate("/login");
      return;
    }

    if (userRole === "recepcion" && ["habitaciones", "servicios"].includes(activeTab)) {
      setErrorMessage("No tienes el rol necesario para crear este elemento. Contacta con el gerente.");
      setIsSubmitting(false);
      return;
    }

    let url = "";
    switch (activeTab) {
      case "clientes":
        url = "https://oceandb-server.vercel.app/api/v1/clientes/register";
        break;
      case "habitaciones":
        url = "https://oceandb-server.vercel.app/api/v1/habitaciones/register";
        break;
      case "reservas":
        url = "https://oceandb-server.vercel.app/api/v1/reservas/register";
        break;
      case "servicios":
        url = "https://oceandb-server.vercel.app/api/v1/servicios/register";
        break;
      case "servicio_reserva":
        url = "https://oceandb-server.vercel.app/api/v1/servicios_reservas/register";
        break;
      case "facturas":
        url = "https://oceandb-server.vercel.app/api/v1/facturas/register";
        break;
      default:
        setErrorMessage("La dirección de la petición no es válida.");
        return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setErrorMessage("No estás autorizado o ha ocurrido un error.");
        throw new Error("No estás autorizado o ha ocurrido un error.");
      } else {
        setSuccessMessage("Elemento creado con éxito.");
      }

      onCreate();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Crear {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>

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
                  autoComplete={field.autoComplete || "off"}
                />
              )}
              {errors[field.name] && <span>{errors[field.name].message}</span>}
            </div>
          ))}

          <button type="submit" className="confirmation-button" disabled={isSubmitting}>
            {isSubmitting ? "Creando..." : "Crear"}
          </button>
        </form>
        <button className="cancel-button" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

const CreateItemButton = ({ activeTab, onCreate }) => {
  const [showModal, setShowModal] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.rol);
      } catch (error) {
        console.error("Error al decodificar el token", error);
      }
    }
  }, []);

  const isRestricted = userRole === "recepcion" && ["habitaciones", "servicios"].includes(activeTab);

  return (
    <>
      <div className="create-btn-container">
        <button className="create-btn"
          onClick={() => setShowModal(true)}
          disabled={isRestricted}>
          Crear
        </button>
      </div>

      {showModal && (
        <CreateItemModal
          activeTab={activeTab}
          onClose={() => setShowModal(false)}
          onCreate={onCreate}
          userRole={userRole}
        />
      )}
    </>
  );
};

export default CreateItemButton;