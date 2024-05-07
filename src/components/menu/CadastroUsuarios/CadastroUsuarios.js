/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "./styleCadastroUsuarios.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faCog,
  faSearch,
  faEllipsisH,
  faEye,
  faPencilAlt,
  faClone,
  faFileExport,
  faTrash,
  faLongArrowAltDown,
  faLongArrowAltUp,
} from "@fortawesome/free-solid-svg-icons";
import VisualizarModal from "./VisualizarModal";
import NewUserModal from "./NewUserModal";
import EditUserModal from "./EditUserModal";

function CadastroUsuarios() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

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

  const openViewModal = (user) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };


  const deleteUser = async (user) => {
    const base64Credentials = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/boRequestUsuarioLoader/${user["cod-usuario"]}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao excluir usuário");
      }

      setUsers((prevUsers) =>
        prevUsers.filter((u) => u["cod-usuario"] !== user["cod-usuario"])
      );
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const updateUser = async (updatedUser) => {
    const base64Credentials = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/boRequestUsuarioLoader/${updatedUser["cod-usuario"]}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${base64Credentials}`,
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar usuário");
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user["cod-usuario"] === updatedUser["cod-usuario"]
            ? updatedUser
            : user
        )
      );
      setEditModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  const addNewUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div className="body-usuario">
      <div className="container-usuario">
        <h1 className="cadastroUsuario">Cadastro de Usuários</h1>
        <br />
        <SearchComponent toggleModal={toggleModal} />
        <UserTable users={users} openViewModal={openViewModal} openEditModal={openEditModal} deleteUser={deleteUser}/>
        {showModal && <NewUserModal toggleModal={toggleModal} addNewUser={addNewUser} />}
        {isViewModalOpen && (
          <VisualizarModal
            isOpen={isViewModalOpen}
            onClose={() => setViewModalOpen(false)}
            user={selectedUser}
          />
        )}
        {isEditModalOpen && (
          <EditUserModal
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            user={selectedUser}
            updateUser={updateUser}
          />
        )}
      </div>
    </div>
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

function UserTable({ users, openViewModal, openEditModal, deleteUser }) {
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    if (dropdownOpenIndex === index) {
      setDropdownOpenIndex(null);
    } else {
      setDropdownOpenIndex(index);
    }
  };

  return (
    <div className="table-responsive-usuario">
      <table className="user-table">
        <thead>
          <tr className="user-title">
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
            ].map((action, index) => (
              <th key={index} scope="col" className="header-with-icon">
                {action}
                <FontAwesomeIcon className="icon-up" icon={faLongArrowAltUp} />
                <FontAwesomeIcon
                  className="icon-down"
                  icon={faLongArrowAltDown}
                />
              </th>
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
              ].map((permission, permissionIndex) => (
                <td key={`${index}-${permissionIndex}`}>
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
                {}
                <div className="dropdown">
                  <button
                    className="button-secondary-user dropdown-toggle"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    onClick={() => toggleDropdown(index)}
                  >
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </button>
                  {dropdownOpenIndex === index && (
                    <div
                      className="dropdown-menu show"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault(); 
                          openViewModal(user);
                        }}
                      >
                        <FontAwesomeIcon icon={faEye} className="icon-option" />
                        Visualizar
                      </a>
                      <a className="dropdown-item" href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        openEditModal(user);
                      }}>
                        <FontAwesomeIcon
                          icon={faPencilAlt}
                          className="icon-option"
                        />
                        Editar
                      </a>
                      <a className="dropdown-item" href="#">
                        <FontAwesomeIcon
                          icon={faClone}
                          className="icon-option"
                        />
                        Duplicar
                      </a>
                      <a className="dropdown-item" href="#">
                        <FontAwesomeIcon
                          icon={faFileExport}
                          className="icon-option"
                        />
                        Exportar
                      </a>
                      <a className="dropdown-item red-text" href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteUser(user);
                      }}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="icon-option"
                        />
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

export default CadastroUsuarios;
