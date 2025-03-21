import React from "react";
import Header from "../components/landing/Header";
import Facilities from "../components/instalaciones/Facilities";
import Footer from "../components/landing/Footer";

const Instalaciones = () => {
  window.scrollTo(0, 0);
    return (
      <div className="instalaciones">
        <Header />
        <Facilities />
        <Footer />
      </div>
    );
  };
  
  export default Instalaciones;