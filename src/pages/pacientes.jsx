import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getPacientes,
  createPaciente,
  updatePaciente,
  deletePaciente,
} from "../api/pacientes";

import searchIcon from "../images/lupa_menu.PNG";
import userIcon from "../images/user_menu.PNG";
import logo_menu from "../images/logo_menu.png";
import logo from "../images/logo.png";

const Menu = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pacientes, setPacientes] = useState([]); // Estado para almacenar pacientes
  const [formData, setFormData] = useState({
    id: null,
    nombres: "",
    apellidos: "",
    edad: "",
    genero: "",
    curp: "",
    lugar: "",
    cedula_medico: "ISC12",
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Cargar pacientes al montar el componente
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const data = await getPacientes();
        setPacientes(data); // Actualizar el estado con los datos obtenidos
      } catch (error) {
        console.error("Error al obtener los pacientes", error);
      }
    };

    fetchPacientes();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenModal = (data = null) => {
    setFormData(
      data || {
        id: null,
        nombres: "",
        apellidos: "",
        edad: "",
        genero: "",
        curp: "",
        lugar: "",
        cedula_medico: "ISC12",
      }
    );
    setShowModal(true);
  };

  const handleDelete = async (curp) => {
    if (!curp) {
      console.error(
        'El parámetro "curp" es obligatorio para eliminar un paciente.'
      );
      return;
    }
    try {
      await deletePaciente(curp);
      setPacientes(pacientes.filter((paciente) => paciente.curp !== curp));
    } catch (error) {
      console.error("Error al eliminar el paciente", error);
    }
  };

  const handleSave = async () => {
    try {
      if (formData.curp) {
        // Actualizar paciente existente
        const updatedPaciente = await updatePaciente(formData.curp, formData);
        setPacientes((prevPacientes) =>
          prevPacientes.map((paciente) =>
            paciente.curp === formData.curp ? updatedPaciente : paciente
          )
        );
      } else {
        // Crear nuevo paciente
        const existingPaciente = pacientes.find(
          (p) => p.curp === formData.curp
        );
        if (existingPaciente) {
          alert(`El paciente con CURP '${formData.curp}' ya existe.`);
          return;
        }
        await createPaciente(formData);
        const data = await getPacientes(); // Recargar la lista de pacientes
        setPacientes(data);
      }
      setShowModal(false);
    } catch (error) {
      console.error(
        "Error al guardar el paciente",
        error.response?.data || error.message
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPacientes = Array.isArray(pacientes)
    ? pacientes.filter(
        (paciente) =>
          paciente.curp &&
          paciente.curp.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []; // Si pacientes no es un array, usar un array vacío

  return (
    <div className="relative min-h-screen bg-gray-100">
      {showModal && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      )}

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
                value={searchQuery}
                onChange={handleSearchChange}
              />
            )}
          </div>

          <button className="flex items-center justify-center w-12 h-12 p-2 bg-white rounded-full shadow-md">
            <img src={userIcon} alt="Usuario" className="w-8 h-8" />
          </button>
        </div>
      </nav>

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
            {filteredPacientes.length > 0 ? (
              filteredPacientes.map((paciente) => (
                <tr key={paciente.id} className="text-center border-b">
                  <td className="p-3">{paciente.id}</td>
                  <td className="p-3">
                    {paciente.nombres} {paciente.apellidos}
                  </td>
                  <td className="p-3">{paciente.edad}</td>
                  <td className="p-3">{paciente.genero}</td>
                  <td className="p-3">{paciente.lugar}</td>
                  <td className="p-3">{paciente.curp}</td>
                  <td className="p-3 space-x-2">
                    <button
                      className="px-3 py-1 text-white bg-[#869CD2] rounded-lg"
                      onClick={() => handleOpenModal(paciente)}
                    >
                      Editar
                    </button>
                    <button
                      className="px-3 py-1 text-white bg-red-500 rounded-lg"
                      onClick={() => handleDelete(paciente.curp)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-3 text-center text-gray-500">
                  No hay pacientes para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
                name="nombres"
                value={formData.nombres}
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
                name="genero"
                id="genero"
                value={formData.genero}
                onChange={handleInputChange}
                className="p-2 text-gray-400 rounded-md w-full bg-[#fdfdfd] placeholder-white"
              >
                <option value="">Selecciona sexo</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
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
                className="p-2 text-black rounded-md"
              />
            </div>

            <div className="flex justify-between mt-4">
              <button
                className="bg-[#10BCE3] px-4 py-2 rounded-lg"
                onClick={handleSave}
              >
                Guardar
              </button>
              <button
                className="px-4 py-2 bg-red-500 rounded-lg"
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
