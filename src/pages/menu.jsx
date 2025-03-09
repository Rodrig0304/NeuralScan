import React, { useState } from "react";
import { Link } from "react-router-dom";

import searchIcon from "../images/lupa_menu.PNG";
import userIcon from "../images/user_menu.PNG";
import logo_menu from "../images/logo_menu.png";

const Menu = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="bg-[#10BCE3] flex items-center justify-between px-8 h-20 shadow-md">
      <div className="flex items-center space-x-3">
        <img src={logo_menu} alt="NeuralScan Logo" className="h-28 w-28" />
        <span className="text-3xl font-bold tracking-wide text-white">
          NeuralScan
        </span>
      </div>

      <div className="flex items-center space-x-10">
        <Link
          to="/pacientes"
          className="text-xl font-semibold text-white transition hover:text-gray-200"
        >
          Pacientes
        </Link>
        <Link
          to="/analisis"
          className="text-xl font-semibold text-white transition hover:text-gray-200"
        >
          Análisis
        </Link>
        <Link
          to="/historico"
          className="text-xl font-semibold text-white transition hover:text-gray-200"
        >
          Histórico
        </Link>
      </div>

      <div className="flex items-center space-x-5">
        <div className="relative">
          <button
            className="flex items-center justify-center w-12 h-12 p-2 bg-white rounded-full shadow-md"
            onClick={() => setShowSearch(!showSearch)}
          >
            <img src={searchIcon} alt="Buscar" className="w-8 h-8" />
          </button>
          {showSearch && (
            <input
              type="text"
              placeholder="Buscar..."
              className="absolute right-0 w-48 p-2 border border-gray-300 rounded-md shadow-md top-14 focus:outline-none"
            />
          )}
        </div>

        <button className="flex items-center justify-center w-12 h-12 p-2 bg-white rounded-full shadow-md">
          <Link to="/Cuenta">
            <img src={userIcon} alt="Usuario" className="w-8 h-8" />
          </Link>
        </button>
      </div>
    </nav>
  );
};

const PrincipalPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Menu />
      <div className="p-6">
        {/* Aquí va el contenido principal de la página */}
        <h2 className="text-3xl font-bold">Bienvenido a NeuralScan</h2>
        {/* Puedes agregar más contenido aquí según lo necesites */}
      </div>
    </div>
  );
};

export default Menu;
