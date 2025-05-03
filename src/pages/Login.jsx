import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../styles/login/login.scss";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(data);
      localStorage.setItem("token", response.token);

      navigate("/dashboard");
    } catch (err) {
      setError("Tus credenciales son incorrectas.");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="welcome-message">
        <img src="/oceanDBLogo.jpeg" alt="Logo Ocean DB" />
        <h1>Bienvenido a OceanDB Hotel</h1>
        <p>Por favor, inicia sesión para continuar.</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Iniciar sesión</h2>

        <label>Email</label>
        <input
          type="email"
          {...register("email", { required: "Email requerido" })}
          autoComplete="off"
          disabled={loading}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <label>Contraseña</label>
        <input
          type="password"
          {...register("password", { required: "Contraseña requerida" })}
          autoComplete="off"
          disabled={loading}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? <span className="loader"></span> : "Ingresar"}
        </button>
      </form>
    </div>
  );
};

export default Login;