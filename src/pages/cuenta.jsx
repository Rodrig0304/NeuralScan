import React from "react";

const Cuenta = () => {
  return (
    <div className="container p-6 mx-auto">
      <h1 className="text-3xl font-bold">Mi Cuenta</h1>
      <div className="mt-4">
        <p className="text-lg">Aquí puedes ver y editar tu perfil.</p>
        {/* Agrega más contenido relevante aquí, como información del usuario, formularios, etc. */}
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Información del Usuario</h2>
        <p className="text-lg">Nombre: Juan Pérez</p>
        <p className="text-lg">Correo electrónico: juan@example.com</p>
        {/* Agrega otros datos del usuario */}
      </div>
    </div>
  );
};

export default Cuenta;
