import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Menu from "./pages/menu";
import Pacientes from "./pages/pacientes"; 
import Analisis from "./pages/analisis";
import Historico from "./pages/historico";
import Cuenta from "./pages/cuenta";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/analisis" element={<Analisis />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/cuenta" element={<Cuenta />} />

      </Routes>
    </Router>
  );
}

export default App;
