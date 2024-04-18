import React, { useState, useEffect } from "react";
import "./styleCadastroUsuarios.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faCog,
  faSearch,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { isDOMComponent } from "react-dom/test-utils";

function CadastroUsuarios() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const base64Credentials = sessionStorage.getItem("token");
    if (!base64Credentials) {
      console.error("base64Credentials not found in sessionStorage");
      return;
    }

    fetch(
      "http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/boRequestUsuarioLoader",
      {
        headers: { Authorization: `Basic ${base64Credentials}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error fetching API data");
      })
      .then((data) => {
        if (data.items && data.items.length > 0) {
          setUsers(data.items);
        } else {
          console.error("No items found in response.");
        }
      })
      .catch((error) => console.error("Error loading API data:", error));
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <body className="body-usuario">
      <div className="container-usuario">
        <h1 className="cadastroUsuario">Cadastro de Usuários</h1>
        <br />
        <SearchComponent toggleModal={toggleModal} />
        <UserTable users={users} />
        {showModal && <NewUserModal toggleModal={toggleModal} />}
      </div>
    </body>
  );
}

function SearchComponent({ toggleModal }) {
  return (
    <div className="search-section-usuario">
      <button className="button-primary-user" onClick={toggleModal}>
        Novo Usuário
      </button>
      <span>
        <input
          type="text"
          placeholder="Pesquisar"
          className="search-input-usuario"
        />
        <button className="button-search">
          <FontAwesomeIcon className="icon-searc" size="sm" icon={faSearch} />
        </button>
      </span>
    </div>
  );
}

function UserTable({ users }) {
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null); // Guarda o índice da linha com o dropdown aberto

  const toggleDropdown = (index) => {
    if (dropdownOpenIndex === index) {
      setDropdownOpenIndex(null); // Fechar o dropdown se clicar novamente no mesmo
    } else {
      setDropdownOpenIndex(index); // Abrir o dropdown da linha clicada
    }
  };

  return (
    <div className="table-responsive-usuario">
      <table className="user-table">
        <thead>
          <tr>
            <th scope="col">Usuário</th>
            <th scope="col">Estabelecimento</th>
            {[
              "Importa",
              "Elimina",
              "Cancela",
              "Altera",
              "Atualiza",
              "Efetua",
              "Arquiva",
              "Manifesta",
              "Prioriza",
              "Rec.Fiscal",
              "Rec.Físico",
            ].map((action) => (
              <th scope="col">{action}</th>
            ))}
            <th scope="col">
              <FontAwesomeIcon icon={faCog} />
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user["cod-usuario"]}</td>
              <td>{user["cod-estabel"]}</td>
              {[
                "l-importa",
                "l-elimina",
                "l-cancela-doc",
                "l-altera-cfop",
                "l-atualiza",
                "l-efetua-download",
                "l-arquiva-xml",
                "l-manifesta",
                "l-prioriza-documento",
                "l-recebe-fiscal",
                "l-recebe-fisico",
              ].map((permission) => (
                <td>
                  {user[permission] ? (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-success"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      className="text-danger"
                    />
                  )}
                </td>
              ))}
              <td>
                {/* Placeholder for options dropdown or similar functionality */}
                <div className="dropdown">
                  <button
                    className="button-secondary-user"
                    onClick={() => toggleDropdown(index)}
                  >
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </button>
                  {dropdownOpenIndex === index && (
                    <div
                      className="dropdown-menu show"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a className="dropdown-item" href="#">
                        Visualizar
                      </a>
                      <a className="dropdown-item" href="#">
                        Editar
                      </a>
                      <a className="dropdown-item" href="#">
                        Duplicar
                      </a>
                      <a className="dropdown-item" href="#">
                        Exportar
                      </a>
                      <a className="dropdown-item red-text" href="#">
                        Excluir
                      </a>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NewUserModal({ toggleModal }) {
  return (
    <div className="modal-usuario">
      <div className="modal-content-usuario">
        <div className="modal-header">
          <h5 className="modal-title">Novo Usuário</h5>
          <button
            type="button"
            className="close-button-usuario"
            onClick={toggleModal}
          >
            &times;
          </button>
        </div>
        <div className="modal-body">
          <form>{/* Form for new user */}</form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="button-secondary-user"
            onClick={toggleModal}
          >
            Cancelar
          </button>
          <button type="button" className="button-primary">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CadastroUsuarios;
