import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import userIcon from "../images/user.PNG";
import passwordIcon from "../images/password.PNG";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/menu");
      } else {
        alert(data.detail || "Error en el inicio de sesión ❌");
      }
    } catch (error) {
      alert("Error al conectar con el servidor ⚠️");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0D4E61] via-[#0BA2C4] to-[#10BCE3]">
      <div className="flex bg-white rounded-2xl shadow-lg w-[800px] h-[400px] overflow-hidden">
        {/* Sección Izquierda - Logo */}
        <div className="w-1/2 bg-gradient-to-b from-[#09687D] to-[#10BCE3] flex items-center justify-center">
          <img
            src={logo}
            alt="NeuralScan Logo"
            className="object-contain w-3/4 h-auto"
          />
        </div>

        {/* Sección Derecha - Formulario */}
        <div className="flex flex-col items-center justify-center w-1/2 p-8 bg-white">
          <div className="bg-[#09687D] text-4xl font-bold text-white text-center font-[Inter] px-20 py-1 rounded-full mb-4">
            Bienvenido
          </div>

          <h2 className="text-4xl font-bold text-black text-center font-[Inter]">
            Inicio de sesión
          </h2>

          <form className="mt-4" onSubmit={handleLogin}>
            {/* Campo Usuario */}
            <div className="mb-3">
              <div className="flex items-center py-2 border-b border-gray-400">
                <img src={userIcon} alt="Usuario" className="w-8 h-8 mr-2" />
                <input
                  type="email"
                  placeholder="Correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="w-full focus:outline-none italic text-[#8B8787] text-2xl font-normal font-[Inter] placeholder:font-normal"
                  required
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div className="mb-3">
              <div className="flex items-center py-2 border-b border-gray-400">
                <img
                  src={passwordIcon}
                  alt="Contraseña"
                  className="w-8 h-8 mr-2"
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full focus:outline-none italic text-[#8B8787] text-2xl font-normal font-[Inter] placeholder:font-normal"
                  required
                />
              </div>
            </div>

            <p className="text-xs italic text-right text-gray-500 cursor-pointer hover:text-blue-500">
              ¿Olvidaste tu contraseña?
            </p>

            <button
              type="submit"
              className="block w-full mt-4 bg-[#17A3B8] text-white py-2 rounded-full font-semibold text-center hover:bg-[#0F8698] transition font-[Inter]"
            >
              Acceder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
