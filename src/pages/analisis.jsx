import React, { useState } from "react";
import { Link } from "react-router-dom";

import searchIcon from "../images/lupa_menu.PNG";
import userIcon from "../images/user_menu.PNG";
import logo_menu from "../images/logo_menu.png";

const Analysis = () => {
  const [searchId, setSearchId] = useState("");
  const [patients, setPatients] = useState([
    { id: "001", name: "Juan Pérez", progress: 0, image: null },
    { id: "002", name: "Ana López", progress: 0, image: null },
  ]);
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleUploadClick = (id) => {
    setSelectedPatient(id);
    setShowUploadMenu(true);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && selectedPatient) {
      const updatedPatients = patients.map((patient) =>
        patient.id === selectedPatient
          ? { ...patient, progress: 100, image: file.name }
          : patient
      );
      setPatients(updatedPatients);
      setShowUploadMenu(false);
    }
  };

  return (
    <div className="min-h-screen text-xl bg-gray-100">
      {/* 🔵 Barra de navegación */}
      <nav className="bg-[#10BCE3] flex items-center justify-between px-8 h-20 shadow-md ">
        {/* 📌 Logo y Nombre */}
        <div className="flex items-center space-x-3">
          <img src={logo_menu} alt="NeuralScan Logo" className="h-28 w-28" />
          <span className="text-3xl font-bold tracking-wide text-white">
            NeuralScan
          </span>
        </div>

        {/* 🔗 Enlaces del menú */}
        <div className="flex items-center space-x-10">
          <Link
            to="/pacientes"
            className="font-semibold text-white transition text-1xl hover:text-gray-200" // Cambié de text-lg a text-xl
          >
            Pacientes
          </Link>
          <Link
            to="/analisis"
            className="font-semibold text-white transition text-1xl hover:text-gray-200" // Cambié de text-lg a text-xl
          >
            Análisis
          </Link>
          <Link
            to="/historico"
            className="font-semibold text-white transition text-1xl hover:text-gray-200" // Cambié de text-lg a text-xl
          >
            Histórico
          </Link>
        </div>

        {/* 🔍 Íconos de usuario y búsqueda */}
        <div className="flex items-center space-x-5">
          {/* Botón de búsqueda */}
          <div className="relative">
            <button className="flex items-center justify-center w-12 h-12 p-2 bg-white rounded-full shadow-md">
              <img src={searchIcon} alt="Buscar" className="w-8 h-8" />
            </button>
          </div>

          {/* Botón de usuario */}
          <button className="flex items-center justify-center w-12 h-12 p-2 bg-white rounded-full shadow-md">
            <img src={userIcon} alt="Usuario" className="w-8 h-8" />
          </button>
        </div>
      </nav>

      {/* 🟠 Contenido principal */}
      <div className="p-6">
        <h1 className="text-4xl font-bold">Análisis</h1>

        {/* 🔍 Buscador alineado */}
        <div className="flex items-center mt-4 space-x-3">
          <label className="text-2xl font-semibold text-black">Buscar:</label>
          <input
            type="text"
            placeholder="Ingrese ID"
            className="p-2 border rounded-lg shadow-sm focus:outline-none text-xl bg-[#09687D] text-white placeholder-white" // Fondo y texto blanco
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>

        {/* 📋 Tabla de pacientes */}
        <table className="w-full mt-5 border border-collapse border-gray-300">
          <thead>
            <tr className="text-white text-xl bg-[#10BCE3]">
              <th>ID</th>
              <th>Nombre</th>
              <th>Cargar</th>
              <th>Proceso</th>
              <th>Análisis</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {patients
              .filter((p) => p.id.includes(searchId))
              .map((patient) => (
                <tr key={patient.id} className="border">
                  <td className="p-2 text-center">{patient.id}</td>
                  <td className="p-2 text-center">{patient.name}</td>
                  <td className="p-2 text-center">
                    <button
                      className="px-4 py-2 text-white bg-[#869CD2] rounded-lg"
                      onClick={() => handleUploadClick(patient.id)}
                    >
                      Ingresar
                    </button>
                  </td>
                  <td className="p-2 text-center">
                    <div className="w-full bg-gray-200 rounded">
                      <div
                        className="h-4 bg-blue-500 rounded"
                        style={{ width: `${patient.progress}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="p-2 text-center">
                    <button className="px-4 py-2 text-white bg-[#E13535] rounded-lg">
                      Analizar
                    </button>
                  </td>
                  <td className="p-2 text-center">
                    <Link to="/historico">
                      <button className="px-4 py-2 text-white bg-[#98BF80] rounded">
                        Ver resultados
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* 📂 Menú para subir imágenes */}
      {showUploadMenu && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">Subir imagen</h2>
            <input type="file" onChange={handleFileUpload} className="mb-4" />
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-white bg-gray-500 rounded"
                onClick={() => setShowUploadMenu(false)}
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

export default Analysis;
