import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import CreateItemButton from "./CreateItemButton";
import SearchBar from "./SearchBar"; // <- no olvides importarlo
import headerMappings from "../../context/headerMappings";
import "../../styles/dashboard/tabContainer.scss";

const TabContainer = () => {
  const [activeTab, setActiveTab] = useState("reservas");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchValues, setSearchValues] = useState({});
  const [clearTrigger, setClearTrigger] = useState(false); // Forzar reinicio de los inputs

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No se encontró el token. Debes estar identificado.");
    navigate("/login");
    return;
  }

  const onCreate = () => {
    fetchData(activeTab, page);
  };

  const onEditSuccess = () => {
    fetchData(activeTab, page);
  };

  const handleDeleteSuccess = (itemId) => {
    setData((prevData) => prevData.filter((item) => item.id !== itemId));
  };

  const fetchData = async (tab, currentPage = 1, limit = 20, filters = {}) => {
    let url = "";

    // Construcción de la URL con filtros (si existen)
    switch (tab) {
      case "clientes":
        url = `https://oceandb-server.vercel.app/api/v1/clientes/search?page=${currentPage}&limit=${limit}&${new URLSearchParams(filters).toString()}`;
        break;
      case "habitaciones":
        url = `https://oceandb-server.vercel.app/api/v1/habitaciones/search?page=${currentPage}&limit=${limit}&${new URLSearchParams(filters).toString()}`;
        break;
      case "reservas":
        url = `https://oceandb-server.vercel.app/api/v1/reservas/search?page=${currentPage}&limit=${limit}&${new URLSearchParams(filters).toString()}`;
        break;
      case "servicios":
        url = `https://oceandb-server.vercel.app/api/v1/servicios/search?page=${currentPage}&limit=${limit}&${new URLSearchParams(filters).toString()}`;
        break;
      case "servicio_reserva":
        url = `https://oceandb-server.vercel.app/api/v1/servicio_reserva/search?page=${currentPage}&limit=${limit}&${new URLSearchParams(filters).toString()}`;
        break;
      case "facturas":
        url = `https://oceandb-server.vercel.app/api/v1/facturas/search?page=${currentPage}&limit=${limit}&${new URLSearchParams(filters).toString()}`;
        break;
      default:
        console.error("La dirección de la petición no es válida.");
        return;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      setData(result.data || []);
      setTotalPages(result.totalPages || 1);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const handleSearchChange = (field, value) => {
    setSearchValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleClearFilters = () => {
    setSearchValues({});
    setClearTrigger((prev) => !prev); // Forzar reinicio de los inputs
    fetchData(activeTab, page); // Vuelve a hacer la búsqueda sin filtros
  };

  const handleSearch = () => {
    setPage(1);
    fetchData(activeTab, 1, 20, searchValues); // Búsqueda con los filtros aplicados
  };

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  useEffect(() => {
    fetchData(activeTab, page, 20, searchValues);
  }, [activeTab, page, searchValues]);

  const getHeaders = (tab) => Object.keys(headerMappings[tab] || {});

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const tabNames = {
    clientes: "Clientes",
    habitaciones: "Habitaciones",
    reservas: "Reservas",
    servicios: "Servicios",
    servicio_reserva: "Servicios a cargo",
    facturas: "Facturas",
  };

  return (
    <div>
      <div className="tabs">
        {Object.keys(headerMappings).map((tab) => (
          <button
            key={tab}
            className={`${activeTab === tab ? "active" : ""} ${tab}`}
            onClick={() => setActiveTab(tab)}
          >
            {tabNames[tab] || tab}
          </button>
        ))}
      </div>

      {/* Filtros */}
      <div className="search-filters">
        {Object.keys(headerMappings[activeTab] || {}).map((field) => (
          <input
            key={field}
            type="text"
            placeholder={`Buscar por ${field}`}
            value={searchValues[field] || ""}
            onChange={(e) => handleSearchChange(field, e.target.value)}
          />
        ))}
        <button onClick={handleSearch}>Buscar</button>
        <button onClick={handleClearFilters} style={{ marginLeft: "10px" }}>
          Eliminar filtros
        </button>
      </div>

      <CreateItemButton activeTab={activeTab} onCreate={onCreate} />

      <DataTable
        headers={getHeaders(activeTab)}
        data={data}
        headerMappings={headerMappings[activeTab]}
        activeTab={activeTab}
        onEditSuccess={onEditSuccess}
        onDeleteSuccess={handleDeleteSuccess}
      />

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page >= totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default TabContainer;