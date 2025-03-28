import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/pacientes';

export const getPacientes = async () => {
  try {
    const response = await axios.get(API_URL);
    return Array.isArray(response.data.data) ? response.data.data : [];
  } catch (error) {
    console.error('Error al obtener pacientes:', error.response?.data || error.message);
    return [];
  }
};

export const createPaciente = async (paciente) => {
  try {
    // Validar que todos los campos requeridos estén presentes
    const requiredFields = ["nombres", "apellidos", "edad", "genero", "curp", "lugar"];
    for (const field of requiredFields) {
      if (!paciente[field]) {
        throw new Error(`El campo "${field}" es obligatorio.`);
      }
    }

    // Asegurar que el campo cedula_medico tenga el valor por defecto
    const pacienteData = { ...paciente, cedula_medico: "ISC12" };

    const response = await axios.post(API_URL, pacienteData);
    return response.data?.data || null;
  } catch (error) {
    if (error.response?.status === 409) {
      // Manejar error de duplicado
      throw new Error("El CURP ya está registrado. Usa un CURP único.");
    }
    console.error('Error al crear paciente:', error.response?.data || error.message);
    throw error;
  }
};

export const updatePaciente = async (curp, paciente) => {
  if (!curp) {
    console.error('El parámetro "curp" es obligatorio para actualizar un paciente.');
    throw new Error('El parámetro "curp" es obligatorio.');
  }
  try {
    // Asegurar que el campo cedula_medico tenga el valor por defecto
    const pacienteData = { ...paciente, cedula_medico: "ISC12" };

    const response = await axios.put(`${API_URL}/${curp}`, pacienteData);
    return response.data?.data || null;
  } catch (error) {
    if (error.response?.status === 409) {
      // Manejar error de duplicado
      throw new Error("El CURP ya está registrado. Usa un CURP único.");
    }
    console.error('Error al actualizar paciente:', error.response?.data || error.message);
    throw error;
  }
};

export const deletePaciente = async (curp) => {
  if (!curp) {
    console.error('El parámetro "curp" es obligatorio para eliminar un paciente.');
    throw new Error('El parámetro "curp" es obligatorio.');
  }
  try {
    await axios.delete(`${API_URL}/${curp}`);
  } catch (error) {
    console.error('Error al eliminar paciente:', error.response?.data || error.message);
    throw error;
  }
};
