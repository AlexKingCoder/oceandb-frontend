import { useNavigate } from "react-router-dom";
import "../../styles/dashboard/header.scss";
import logo from "/oceanDBLogo.jpeg";

const Header = ({ nombre }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header__left">
        <img src={logo} alt="Logo" className="header__logo" />
        <h1 className="header__welcome">Bienvenido, {nombre}</h1>
      </div>

      <button className="header__logout" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </header>
  );
};

export default Header;