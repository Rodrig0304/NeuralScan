import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import userIcon from "../images/user.PNG";
import passwordIcon from "../images/password.PNG";

const Login = () => {
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

          <form className="mt-4">
            {/* Campo Usuario */}
            <div className="mb-3">
              <div className="flex items-center py-2 border-b border-gray-400">
                <img src={userIcon} alt="Usuario" className="w-8 h-8 mr-2" />
                <input
                  type="text"
                  placeholder="Usuario"
                  className="w-full focus:outline-none italic text-[#8B8787] text-2xl font-normal font-[Inter] placeholder:font-normal"
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
                  className="w-full focus:outline-none italic text-[#8B8787] text-2xl font-normal font-[Inter] placeholder:font-normal"
                />
              </div>
            </div>

            <p className="text-xs italic text-right text-gray-500 cursor-pointer hover:text-blue-500">
              ¿Olvidaste tu contraseña?
            </p>

            {/* Link a la página de menú */}
            <Link
              to="/menu"
              className="block w-full mt-4 bg-[#17A3B8] text-white py-2 rounded-full font-semibold text-center hover:bg-[#0F8698] transition font-[Inter]"
            >
              Acceder
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
