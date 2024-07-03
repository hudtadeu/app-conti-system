/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./styleMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faAddressBook,
  faTasks,
  faUserCircle,
  faChartBar,
  faMagnifyingGlass,
  faSignOutAlt,
  faChevronDown,
  faChevronRight,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";

function Menu({ menuActive, toggleMenu }) {
  const [username, setUsername] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const submenuRef = useRef(null); 

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      console.log("Nome do Usuário:", storedUsername);
      setUsername(`Bem-vindo, ${storedUsername}`);
    } else {
      console.error("Nome do usuário não encontrado na sessionStorage");
      setUsername("Bem-vindo");
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("Logout clicado");
    sessionStorage.clear();
    window.location.href = "/";
  };

  const handleMenuClick = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menu);
    }
  };

  const handleSubMenuClick = (e, menu) => {
    e.stopPropagation(); 
    setActiveMenu(menu);
  };

  return (
    <div className="App">
      <header
        id="header-menu"
        className={`header text-light text-center py-3 ${
          menuActive ? "menu-active" : ""
        }`}
      >
        <button
          id="botaoAbrirFechar"
          className="btn btn-outline-light"
          onClick={toggleMenu}
          title={menuActive ? "Fechar Menu" : "Abrir Menu"}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </header>

      <nav className={`sidebar ${menuActive ? "active" : ""}`}>
        <div className="sidebar-sticky">
          <img
            id="img-menu"
            src="./conti-bg.png"
            alt="Logo da ConTI Consultoria"
          />
          <h2 className="sidebar-title">
            <FontAwesomeIcon icon={faUserCircle} className="user-icon" /> {username}
          </h2>
          <ul className="nav flex-column">
          <li className="nav-item" >
              <a className="nav-link">
                <FontAwesomeIcon icon={faChartPie} className="mr-2" /> Painel de Controle
              </a>
            </li>
            <li className="nav-item" onClick={() => handleMenuClick("cadastros")}>
              <a className="nav-link">
                <FontAwesomeIcon icon={faAddressBook} className="mr-2" /> Cadastros
                <span className="float-right">
                  <FontAwesomeIcon icon={activeMenu === "cadastros" ? faChevronDown : faChevronRight} />
                </span>
              </a>
              {activeMenu === "cadastros" && (
                <ul ref={submenuRef} className="nav flex-column pl-3 sub-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "cadastros")}>
                      Bloqueio CFOP Entrada
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "cadastros")}>
                      Cadastro de Tipo de Divergencia
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cadastroEventos" onClick={(e) => handleSubMenuClick(e, "cadastros")}>
                      Cadastro Eventos XML Loader
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "cadastros")}>
                      Geração de Arquivo de Configuração
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "cadastros")}>
                      Habilitação de Função XML Loader
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "cadastros")}>
                      Manutenção Cidades NFS-e
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "cadastros")}>
                      Manutenção Natureza Op Relacionada
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cadastroUsuarios" onClick={(e) => handleSubMenuClick(e, "cadastros")}>
                      Parâmetros Usuários XML Loader
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/empresa" onClick={(e) => handleSubMenuClick(e, "cadastros")}>
                      Parâmetros XML Loader
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "cadastros")}>
                      Relação Grupo de Estoque  para alteração NCM/GTIN
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li className="nav-item" onClick={() => handleMenuClick("tarefas")}>
              <a className="nav-link">
                <FontAwesomeIcon icon={faTasks} className="mr-2" /> Tarefas
                <span className="float-right">
                  <FontAwesomeIcon icon={activeMenu === "tarefas" ? faChevronDown : faChevronRight} />
                </span>
              </a>
              {activeMenu === "tarefas" && (
                <ul ref={submenuRef} className="nav flex-column pl-3 sub-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "tarefas")}>
                      Arquivamento de Documentos já Implatados
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "tarefas")}>
                      Atualização Parâmetros XML Loader em Lote
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "tarefas")}>
                      Carga de Arquivos XML
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "tarefas")}>
                      Consulta NF Destinadas - SEFAZ
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "tarefas")}>
                      Controle Pendências Cancelamento
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "tarefas")}>
                      Cópia XML Colaboração x XML Loader
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "tarefas")}>
                      Download e-mail Loader
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "tarefas")}>
                      Emitente XML Loader
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "tarefas")}>
                      Exporta Documentos Fiscais
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "tarefas")}>
                      Exporta Documentos XML
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "tarefas")}>
                      Importa Documentos Fiscais
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "tarefas")}>
                      Importação de Arquivos BATCH
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "tarefas")}>
                      Importação Documento XML
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "tarefas")}>
                      Manifestação de Documentos
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "tarefas")}>
                      Manifestação Desconhecidos da Operação BATCH
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li className="nav-item" onClick={() => handleMenuClick("consultas")}>
              <a className="nav-link">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" /> Consultas
                <span className="float-right">
                  <FontAwesomeIcon icon={activeMenu === "consultas" ? faChevronDown : faChevronRight} />
                </span>
              </a>
              {activeMenu === "consultas" && (
                <ul ref={submenuRef} className="nav flex-column pl-3 sub-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "consultas")}>
                      Consulta Disponibilidade SEFAZ
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/consultarDocumentos" onClick={(e) => handleSubMenuClick(e, "consultas")}>
                      Consulta Documento XML
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "consultas")}>
                      Listagem Municipios NFS-e XML Loader
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "consultas")}>
                      LOG Importação XML Loader
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li className="nav-item" onClick={() => handleMenuClick("relatorios")}>
              <a className="nav-link">
                <FontAwesomeIcon icon={faChartBar} className="mr-2" /> Relatórios
                <span className="float-right">
                  <FontAwesomeIcon icon={activeMenu === "relatorios" ? faChevronDown : faChevronRight} />
                </span>
              </a>
              {activeMenu === "relatorios" && (
                <ul ref={submenuRef} className="nav flex-column pl-3 sub-menu">
                  <li className="nav-item">
                    <Link className="nav-link" to="/xmlObrigFiscais" onClick={(e) => handleSubMenuClick(e, "relatorios")}>
                      Conciliação XML X Obrig Fiscais
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/xmlRecebimento" onClick={(e) => handleSubMenuClick(e, "relatorios")}>
                      Conciliação XML X Recebimento
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "relatorios")}>
                      Emissor DANFE
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "relatorios")}>
                      Estatística de Implantação de Documentos
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "relatorios")}>
                      Estastísticas XML
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "relatorios")}>
                      Priorização de Documentos
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "relatorios")}>
                      Relação de DANFES em atraso
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "relatorios")}>
                      Relação de XML's arquivados
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "relatorios")}>
                      Relação de Divergências
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "relatorios")}>
                      Relatório de Duplicatas XML Loader
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "relatorios")}>
                      Relatório de Eventos XML
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => handleSubMenuClick(e, "relatorios")}>
                      Relatório de NF-e do XML Loader
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link logout-link"
                onClick={handleLogout}
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Sair
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main className={`content ${menuActive ? "" : "menu-inactive"}`}></main>

      <footer
        className={`footer bg-primary text-light text-center ${
          menuActive ? "menu-active" : ""
        }`}
      ></footer>
    </div>
  );
}

export default Menu;
