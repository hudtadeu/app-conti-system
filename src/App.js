import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import CadastroUsuarios from "./components/menu/cadastros/cadastroUsuarios/CadastroUsuarios";
import CadastroEventos from "./components/menu/cadastros/cadastroEventos/CadastroEventos";
import ConsultarDocumentos from "./components/menu/consultas/consultarDocumentos/ConsultarDocumentos";
import Empresa from "./components/menu/cadastros/empresa/Empresa";
import Layout from "./components/Layout";
import PesquisaConsultarDocumentos from "./components/menu/consultas/consultarDocumentos/PesquisaConsultarDocumentos";
import DetalhesConsultarDocumentos from "./components/menu/consultas/consultarDocumentos/DetalhesConsultarDocumentos";
import XmlObrigFiscais from "./components/menu/relatorios/xmlObrigFiscais/XmlObrigFiscais";
import XmlRecebimento from "./components/menu/relatorios/xmlRecebimento/XmlRecebimento";
import Dashboard from "./components/menu/painelDeControle/Dashboard";
import ConsultaCargaArquivosXml from "./components/menu/tarefas/cargaArqXml/ConsultaCargaArquivosXml";
import PesquisaCargaArquivosXml from "./components/menu/tarefas/cargaArqXml/PesquisaCargaArquivosXml";

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Layout></Layout>} />
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
            <Route
              path="consultarDocumentos"
              element={
                <Layout>
                  <ConsultarDocumentos />
                </Layout>
              }
            />
            <Route
              path="pesquisaConsultarDocumentos"
              element={
                <Layout>
                  <PesquisaConsultarDocumentos />
                </Layout>
              }
            />
            <Route
              path="detalhesConsultarDocumentos"
              element={
                <Layout>
                  <DetalhesConsultarDocumentos />
                </Layout>
              }
            />
            <Route
              path="xmlObrigFiscais"
              element={
                <Layout>
                  <XmlObrigFiscais />
                </Layout>
              }
            />
            <Route
              path="xmlRecebimento"
              element={
                <Layout>
                  <XmlRecebimento />
                </Layout>
              }
            />
            <Route
              path="consultaCargaArquivosXml"
              element={
                <Layout>
                  <ConsultaCargaArquivosXml />
                </Layout>
              }
            />
            <Route
              path="pesquisaCargaArquivosXml"
              element={
                <Layout>
                  <PesquisaCargaArquivosXml />
                </Layout>
              }
            />
            <Route
              path="dashboard"
              element={
                <Layout>
                  <Dashboard />
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
