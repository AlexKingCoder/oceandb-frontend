import { Link } from "react-router-dom";
import logo from "/oceanDBLogo.jpeg";
import "../../styles/landing/header.scss";

const Header = () => {
  return (
    <header className="header-landing">
      <div className="header-landing__logo">
        <img src={logo} alt="OceanDB Hotel" />
        <h1>Ocean Experience Hotel</h1>
      </div>
      <nav className="header-landing__nav">
        <Link to="/" className="header-landing__link">Home</Link>
        <Link to="/instalaciones" className="header-landing__link">Instalaciones</Link>
        <Link to="/login" className="header-landing__link">Acceso Personal</Link>
      </nav>
    </header>
  );
};

export default Header;