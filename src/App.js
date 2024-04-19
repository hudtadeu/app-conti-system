import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Menu from "./components/menu/Menu";
import CadastroUsuarios from "./components/menu/cadastroUsuarios/CadastroUsuarios";
import CadastroEventos from "./components//menu/cadastroEventos/CadastroEventos";
import Empresa from "./components/menu/empresa/Empresa";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/menu"
              element={
                <Layout>
                  <Menu />
                </Layout>
              }
            />
            <Route
              path="cadastroEventos"
              element={
                <Layout>
                  <CadastroEventos />
                </Layout>
              }
            />
            <Route
              path="cadastroUsuarios"
              element={
                <Layout>
                  <CadastroUsuarios />
                </Layout>
              }
            />
            <Route
              path="empresa"
              element={
                <Layout>
                  <Empresa />
                </Layout>
              }
            />
            {/* Other routes */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
