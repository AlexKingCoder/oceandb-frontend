import React, { useState, useEffect } from "react";
import headerMappings from "../../context/headerMappings";
import "../../styles/dashboard/searchBar.scss";

const SearchBar = ({ activeTab, onSearch }) => {
  const [selectedField, setSelectedField] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const availableFields = Object.keys(headerMappings[activeTab] || {});

  useEffect(() => {
    // Resetear búsqueda al cambiar de pestaña
    setSelectedField("");
    setSearchTerm("");
  }, [activeTab]);

  const handleSearch = () => {
    if (selectedField && searchTerm.trim()) {
      onSearch(selectedField, searchTerm.trim());
    }
  };

  return (
    <div className="search-bar">
      <select
        value={selectedField}
        onChange={(e) => setSelectedField(e.target.value)}
      >
        <option value="">Selecciona un campo</option>
        {availableFields.map((field) => (
          <option key={field} value={field}>
            {headerMappings[activeTab][field]}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar;