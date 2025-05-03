import React from "react";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Header from "../components/dashboard/Header"
import TabContainer from "../components/dashboard/TabContainer";

const Dashboard = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setNombreUsuario(decoded.nombre || "Usuario");
      } catch (error) {
        console.error("Error al decodificar el token", error);
        setNombreUsuario("Usuario");
      }
    }
  }, []);

  return (
    <div className="dashboard">
      <Header nombre={nombreUsuario} />
      <TabContainer />
      <main className="dashboard__content">
      </main>
    </div>
  );
};

export default Dashboard;