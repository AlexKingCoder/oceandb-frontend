import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Instalaciones from "./pages/Instalaciones";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/instalaciones" element={<Instalaciones />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;