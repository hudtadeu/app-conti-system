import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Menu from "./components/menu/Menu";
import CadastroEventos from "./components/menu/CadastroEventos/CadastroEventos";
import CadastroUsuarios from "./components/menu/CadastroUsuarios/CadastroUsuarios";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cadastroEventos" element={<CadastroEventos />} />
        <Route path="/cadastroUsuarios" element={<CadastroUsuarios />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
