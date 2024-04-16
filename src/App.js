import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Menu from "./components/menu/Menu";
import CadastroUsuarios from "./components/menu/cadastroUsuarios/CadastroUsuarios";
import CadastroEventos from "./components/menu/cadastroEventos/CadastroEventos";
import Empresa from "./components/menu/empresa/Empresa";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cadastroEventos" element={<CadastroEventos />} />
        <Route path="/cadastroUsuarios" element={<CadastroUsuarios />} />
        <Route path="/empresa" element={<Empresa />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
