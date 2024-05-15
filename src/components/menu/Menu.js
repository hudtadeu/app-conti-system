/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "./styleMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCogs,
  faTasks,
  faChartBar,
  faMagnifyingGlass,
  faSignOutAlt,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

function Menu({ menuActive, toggleMenu }) {
  const [username, setUsername] = useState("");

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
          <h2 className="sidebar-title">{username}</h2>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link">
                <FontAwesomeIcon icon={faCogs} className="mr-2" /> Manutenção
                <span className="float-right">
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
              </a>
              <ul className="nav flex-column pl-3 sub-menu">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Parâmetros XML Loader
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Parâmetros Usuários XML Loader
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Geração Arquivo Configuração
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Natureza Op Relacionada
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <FontAwesomeIcon icon={faTasks} className="mr-2" /> Tarefas
                <span className="float-right">
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
              </a>
              <ul className="nav flex-column pl-3 sub-menu">
                <li className="nav-item">
                  <a className="nav-link" href="./empresa">
                    Empresa
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="./cadastroUsuarios">
                    Cadastro de Usuários do XML Loader
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="./cadastroEventos">
                    Cadastro de Eventos do XML Loader
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" /> Consultas
                <span className="float-right">
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
              </a>
              <ul className="nav flex-column pl-3 sub-menu">
                <li className="nav-item">
                  <a className="nav-link" href="./consultarDocumentos">
                    Consultar Documento
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <FontAwesomeIcon icon={faChartBar} className="mr-2" />{" "}
                Relatórios
                <span className="float-right">
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link logout-link"
                onClick={handleLogout}
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
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
