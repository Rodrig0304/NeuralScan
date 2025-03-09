import React, { useState } from "react";
import { Link } from "react-router-dom";

import searchIcon from "../images/lupa_menu.PNG";
import userIcon from "../images/user_menu.PNG";
import logo_menu from "../images/logo_menu.png";
import logo from "../images/logo.png";

const Menu = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pacientes, setPacientes] = useState([
    { id: 1, nombre: "Juan Pérez", curp: "JUAP920524HDFRNS01", lugar: "CDMX" },
    {
      id: 2,
      nombre: "María López",
      curp: "MALO780815MNCXSR02",
      lugar: "Guadalajara",
    },
    {
      id: 3,
      nombre: "Carlos Díaz",
      curp: "CADI981230HGRNLR03",
      lugar: "Monterrey",
    },
    {
      id: 4,
      nombre: "Ana Torres",
      curp: "ANTO030506HDFRZZ04",
      lugar: "Puebla",
    },
  ]);
  const [formData, setFormData] = useState({
    id: null,
    nombre: "",
    apellidos: "",
    edad: "",
    sexo: "",
    curp: "",
    lugar: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenModal = (data = null) => {
    setFormData(
      data || {
        id: null,
        nombre: "",
        apellidos: "",
        edad: "",
        sexo: "",
        curp: "",
        lugar: "",
      }
    );
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setPacientes(pacientes.filter((paciente) => paciente.id !== id));
  };

  const handleSave = () => {
    if (formData.id) {
      setPacientes(
        pacientes.map((paciente) =>
          paciente.id === formData.id ? formData : paciente
        )
      );
    } else {
      setPacientes([...pacientes, { ...formData, id: pacientes.length + 1 }]);
    }
    setShowModal(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPacientes = pacientes.filter((paciente) =>
    paciente.curp.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Fondo borroso solo si el modal está abierto */}
      {showModal && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      )}

      {/* Barra de navegación */}
      <nav className="bg-[#10BCE3] flex items-center justify-between px-8 h-20 shadow-md relative z-10">
        <div className="flex items-center space-x-3">
          <img src={logo_menu} alt="NeuralScan Logo" className="h-28 w-28" />
          <span className="text-3xl font-bold tracking-wide text-white">
            NeuralScan
          </span>
        </div>

        <div className="flex items-center space-x-10">
          <Link
            to="/pacientes"
            className="text-xl font-semibold text-white transition hover:text-gray-200" // Cambié de text-1xl a text-xl
          >
            Pacientes
          </Link>
          <Link
            to="/analisis"
            className="text-xl font-semibold text-white transition hover:text-gray-200" // Cambié de text-1xl a text-xl
          >
            Análisis
          </Link>
          <Link
            to="/historico"
            className="text-xl font-semibold text-white transition hover:text-gray-200" // Cambié de text-1xl a text-xl
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
            <img src={userIcon} alt="Usuario" className="w-8 h-8" />
          </button>
        </div>
      </nav>

      {/* Tabla de pacientes */}
      <div className="relative z-10 p-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-4xl font-semibold">Pacientes</h2>
          <button
            className="bg-[#09687D] text-white px-4 py-2 rounded-lg shadow-md"
            onClick={() => handleOpenModal()}
          >
            Nuevo Paciente
          </button>
        </div>

        {/* Input de búsqueda */}
        <div className="flex items-center mb-4 space-x-2">
          <label htmlFor="search" className="text-lg font-semibold">
            Buscar:
          </label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="CURP"
            className="p-2 w-80 text-white rounded-lg border-none focus:outline-none bg-[#09687D] placeholder-white"
          />
        </div>

        {/* Tabla */}
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-[#09687D] text-white">
              <th className="p-3">ID</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Edad</th>
              <th className="p-3">Sexo</th>
              <th className="p-3">Lugar</th>
              <th className="p-3">CURP</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPacientes.map((paciente) => (
              <tr key={paciente.id} className="text-center border-b">
                <td className="p-3">{paciente.id}</td>
                <td className="p-3">{paciente.nombre}</td>
                <td className="p-3">{paciente.edad}</td>
                <td className="p-3">{paciente.sexo}</td>
                <td className="p-3">{paciente.lugar}</td>
                <td className="p-3">{paciente.curp}</td>
                <td className="p-3 space-x-2">
                  <button
                    className="px-3 py-1 text-white  bg-[#869CD2] rounded-lg"
                    onClick={() => handleOpenModal(paciente)}
                  >
                    Editar
                  </button>
                  <button
                    className="px-3 py-1 text-white bg-red-500 rounded-lg"
                    onClick={() => handleDelete(paciente.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-20 flex items-center justify-center">
          <div className="bg-gradient-to-b from-[#10BCE3] to-[#04668B] text-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-center mb-4">
              <img src={logo} alt="NeuralScan Logo" className="w-48 h-48" />
            </div>

            <h2 className="mb-4 text-xl font-bold">Datos del paciente</h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Nombre(s)"
                className="p-2 text-black rounded-md"
              />
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleInputChange}
                placeholder="Apellidos"
                className="p-2 text-black rounded-md"
              />
              <input
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleInputChange}
                placeholder="Edad"
                className="p-2 text-black rounded-md"
              />
              <select
                name="sexo"
                value={formData.sexo}
                onChange={handleInputChange}
                className="p-2 text-black rounded-md"
              >
                <option value="">Selecciona</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
              <input
                type="text"
                name="curp"
                value={formData.curp}
                onChange={handleInputChange}
                placeholder="CURP"
                className="p-2 text-black rounded-md"
              />
              <input
                type="text"
                name="lugar"
                value={formData.lugar}
                onChange={handleInputChange}
                placeholder="Lugar"
                className="col-span-2 p-2 text-black rounded-md"
              />
            </div>

            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 text-white bg-green-500 rounded-lg"
                onClick={handleSave}
              >
                Guardar
              </button>
              <button
                className="px-4 py-2 text-white bg-red-500 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
