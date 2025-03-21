import { jwtDecode } from "jwt-decode";

export const loginUser = async (data) => {
  const response = await fetch("https://oceandb-server.vercel.app/api/v1/usuarios/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error en la autenticación");
  }

  const result = await response.json();
  const token = result.token;

  localStorage.setItem("token", token);

  return result;
};

export const isTokenExpired = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return true;
  }

  try {
    const decodedToken = jwtDecode(token);

    if (!decodedToken.exp) {
      return true;
    }

    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();

    return currentTime > expirationTime;
  } catch (error) {
    console.error("Error decodificando el token:", error);
    return true;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  const navigate = useNavigate();
  navigate("/login");
};