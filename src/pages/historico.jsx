import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const Historico = () => {
  const [descripcion, setDescripcion] = useState("");
  const [pacienteSeleccionado, setPacienteSeleccionado] =
    useState("Paciente 1");
  const [mostrarPacientes, setMostrarPacientes] = useState(false);
  const [tumorSeleccionado, setTumorSeleccionado] = useState(0); // Índice para Tumor A, Tumor B, etc.
  const [buscarPaciente, setBuscarPaciente] = useState("");

  const pacientes = [
    { id: 1, nombre: "Paciente 1" },
    { id: 2, nombre: "Paciente 2" },
    { id: 3, nombre: "Paciente 3" },
  ]; // Lista de pacientes con ID
  const tumores = [
    {
      nombre: "Tumor A",
      imagenes: [
        { tipo: "Imagen Original", src: "/imagen-original.png" },
        { tipo: "Imagen Modelo", src: "/imagen-modelo.png" },
      ],
    },
    {
      nombre: "Tumor B",
      imagenes: [
        { tipo: "Imagen Original", src: "/imagen-tumor-b1.png" },
        { tipo: "Imagen Modelo", src: "/imagen-tumor-b2.png" },
      ],
    },
    {
      nombre: "Tumor C",
      imagenes: [
        { tipo: "Imagen Original", src: "/imagen-tumor-c1.png" },
        { tipo: "Imagen Modelo", src: "/imagen-tumor-c2.png" },
      ],
    },
  ];

  // Filtrar pacientes por nombre
  const pacientesFiltrados = pacientes.filter((paciente) =>
    paciente.nombre.toLowerCase().includes(buscarPaciente.toLowerCase())
  );

  // Obtener las imágenes del tumor seleccionado
  const tumorActual = tumores[tumorSeleccionado];
  const imagenesTumor = tumorActual ? tumorActual.imagenes : [];

  // Cambiar entre Tumor A, Tumor B, etc.
  const cambiarTumor = (direccion) => {
    setTumorSeleccionado((prevIndex) => {
      const nextIndex = prevIndex + direccion;
      if (nextIndex < 0) return tumores.length - 1;
      if (nextIndex >= tumores.length) return 0;
      return nextIndex;
    });
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gray-100">
      <Menu />
      <div className="flex-1 p-6 mt-4 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Histórico</h2>
        </div>

        {/* Paciente seleccionado */}
        <p className="mt-2 text-2xl font-semibold">{pacienteSeleccionado}</p>

        <div className="flex mt-4">
          <div className="w-1/4 p-2 border-r">
            {/* Cuadro de búsqueda */}
            <label className="block mb-2 font-semibold">Buscar:</label>
            <input
              type="text"
              value={buscarPaciente}
              onChange={(e) => setBuscarPaciente(e.target.value)}
              placeholder="🔍 Buscar paciente por nombre..."
              className="w-full p-2 border border-gray-300 rounded-md shadow-md"
            />

            {/* Tabla de pacientes */}
            <div className="mt-4 overflow-y-auto max-h-[calc(100vh-250px)]">
              <table className="w-full border-collapse table-auto">
                <thead>
                  <tr className="text-left border-b">
                    <th className="px-4 py-2 font-semibold">ID</th>
                    <th className="px-4 py-2 font-semibold">Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {pacientesFiltrados.map((paciente) => (
                    <tr
                      key={paciente.id}
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => setPacienteSeleccionado(paciente.nombre)}
                    >
                      <td className="px-4 py-2">{paciente.id}</td>
                      <td className="px-4 py-2">{paciente.nombre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col w-3/4 gap-4 p-4">
            {/* Carrusel de tumores */}
            <div className="flex flex-col items-center mt-4">
              <h3 className="text-2xl font-semibold">{tumorActual.nombre}</h3>
              <div className="flex items-center justify-center gap-4 mt-4">
                <ChevronLeft
                  className="text-gray-500 cursor-pointer"
                  size={32}
                  onClick={() => cambiarTumor(-1)}
                />
                <div className="flex justify-between w-full gap-4">
                  <div className="w-1/2 p-4 border border-gray-300 rounded-md">
                    <img
                      src={imagenesTumor[0]?.src}
                      alt={imagenesTumor[0]?.tipo}
                      className="object-cover h-64 w-80" // Cambié la altura
                    />
                    <p className="mt-2 text-sm font-medium text-center">
                      {imagenesTumor[0]?.tipo}
                    </p>
                  </div>
                  <div className="w-1/2 p-4 border border-gray-300 rounded-md">
                    <img
                      src={imagenesTumor[1]?.src}
                      alt={imagenesTumor[1]?.tipo}
                      className="object-cover w-full h-64" // Cambié la altura
                    />
                    <p className="mt-2 text-sm font-medium text-center">
                      {imagenesTumor[1]?.tipo}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className="text-gray-500 cursor-pointer"
                  size={32}
                  onClick={() => cambiarTumor(1)}
                />
              </div>
            </div>

            {/* Pie de imagen y descripción ahora invertidos */}
            <div className="flex gap-4 mt-4">
              {/* Descripción de la imagen ahora a la izquierda */}
              <div className="w-1/2">
                <label className="block font-semibold">Descripción:</label>
                <textarea
                  className="w-full p-2 border rounded-md"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>
                <button className="w-24 p-2 mt-2 text-white bg-green-500 rounded-md hover:bg-green-600">
                  Guardar
                </button>{" "}
                {/* Botón más pequeño */}
              </div>

              {/* Detalles de tumor a la derecha */}
              <div className="w-1/2">
                <p className="text-lg font-medium">Tumor A: 2</p>
                <p className="text-lg font-medium">Tumor B: 3</p>
                <p className="text-lg font-medium">Total: 5 anomalías</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Historico;
