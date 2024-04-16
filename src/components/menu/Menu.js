/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "./styleMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCogs,
  faTasks,
  faChartBar,
  faSignOutAlt,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

function Menu() {
  const [menuActive, setMenuActive] = useState(true);
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

  const handleToggleMenu = () => {
    setMenuActive((prev) => !prev);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("Logout clicado");
    sessionStorage.clear();
    window.location.href = "../../login/login.html";
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
          className="btn btn-outline-light"
          onClick={handleToggleMenu}
          title={menuActive ? "Fechar Menu" : "Abrir Menu"}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <img
          id="img-menu"
          src="./conti-bg.png"
          alt="Logo da ConTI Consultoria"
        />
      </header>

      <nav className={`sidebar ${menuActive ? "active" : ""}`}>
        <div className="sidebar-sticky">
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
                  <a className="nav-link" href="./CadastroEventos">
                    Cadastro de Eventos do XML Loader
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <FontAwesomeIcon icon={faChartBar} className="mr-2" />{" "}
                Relatórios
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

      <main className={`content ${menuActive ? "menu-active" : ""}`}>
        <h1 className="mt-4">Conteúdo da Página</h1>
        <p>Seu conteúdo aqui...</p>
      </main>

      <footer
        className={`footer bg-primary text-light text-center ${
          menuActive ? "menu-active" : ""
        }`}
      >
        <p className="conti-menu">ConTI Consultoria - &copy; 2024</p>
      </footer>
    </div>
  );
}

export default Menu;
