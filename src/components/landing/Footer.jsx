import React from "react";
import "../../styles/landing/footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} OceanDB - Diseñado y creado por King Coder. Todos los derechos reservados.</p>
      <nav>
        <a href="#">Términos y condiciones</a>
        <a href="#">Política de privacidad</a>
        <a href="#">Contacto</a>
      </nav>
    </footer>
  );
};

export default Footer;