/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback, useRef } from "react";
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
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import VisualizarModal from "./VisualizarModal";
import NewUserModal from "./NewUserModal";
import EditUserModal from "./EditUserModal";

function CadastroUsuarios() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(() => {
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
        throw new Error("Erro ao buscar dados da API");
      })
      .then((data) => {
        if (data.items && data.items.length > 0) {
          setUsers(data.items);
        } else {
          console.error("Nenhum item encontrado na resposta.");
        }
      })
      .catch((error) => console.error("Erro ao carregar dados da API:", error));
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user["cod-usuario"].toLowerCase().includes(searchTerm.toLowerCase()) ||
        user["cod-estabel"].toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const toggleNewUserModal = () => {
    setLoading(true);
    setShowNewUserModal(!showNewUserModal);
    setLoading(false);
  };

  const openViewModal = (user) => {
    setLoading(true);
    setSelectedUser(user);
    setViewModalOpen(true);
    setLoading(false);
  };

  const openEditModal = (user) => {
    setLoading(true);
    setSelectedUser(user);
    setEditModalOpen(true);
    setLoading(false);
  };

  const deleteUser = async (user) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updatedUser) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const addNewUser = (newUser) => {
    setLoading(true);
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setLoading(false);
  };

  const handleDuplicateUser = (user) => {
    setLoading(true);
    const newUserCode = `${user['cod-usuario']}${Date.now()}`;
    const newUser = { ...user, "cod-usuario": newUserCode };
    addNewUser(newUser);
    setLoading(false);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleExport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000); 
  };

  return (
    <div className="body-usuario">
      {loading && (
        <div className="overlay-cadastro-usuarios">
          <div className="loading-container-usuarios">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
          </div>
        </div>
      )}
      <div className={`container-usuario ${loading ? 'blur' : ''}`}>
        <h1 className="cadastroUsuario">Cadastro de Usuários</h1>
        <br />
        <SearchComponent toggleModal={toggleNewUserModal} onSearch={handleSearch} />
        <UserTable users={filteredUsers} openViewModal={openViewModal} openEditModal={openEditModal} deleteUser={deleteUser} handleDuplicateUser={handleDuplicateUser} handleExport={handleExport} />
        {showNewUserModal && <NewUserModal toggleModal={toggleNewUserModal} addNewUser={addNewUser} />}
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

function SearchComponent({ toggleModal, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-section-usuario">
      <button className="button-primary-user" onClick={toggleModal}>
        Novo Usuário
      </button>
      <span>
        <input
          type="text"
          placeholder="Pesquisa rápida"
          className="search-input-usuario"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className="button-search">
          <FontAwesomeIcon className="icon-search" size="sm" icon={faSearch} />
        </button>
      </span>
    </div>
  );
}

function UserTable({ users, openViewModal, openEditModal, deleteUser, handleDuplicateUser, handleExport }) {
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);
  const dropdownRefs = useRef([]);

  const toggleDropdown = (index) => {
    if (dropdownOpenIndex === index) {
      setDropdownOpenIndex(null);
    } else {
      setDropdownOpenIndex(index);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickOutside = (event) => {
    if (dropdownOpenIndex !== null && dropdownRefs.current[dropdownOpenIndex] && !dropdownRefs.current[dropdownOpenIndex].contains(event.target)) {
      setDropdownOpenIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpenIndex, handleClickOutside]);

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
              <div className="dropdown-user" ref={(el) => (dropdownRefs.current[index] = el)}>
                  <button
                    className="button-secondary-user"
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
                      className="dropdown-menu-user show"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a
                        className="dropdown-item-user"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          openViewModal(user);
                        }}
                      >
                        <FontAwesomeIcon icon={faEye} className="icon-option-user" />
                        Visualizar
                      </a>
                      <a
                        className="dropdown-item-user"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          openEditModal(user);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faPencilAlt}
                          className="icon-option-user"
                        />
                        Editar
                      </a>
                      <a className="dropdown-item-user"
                       href="#"
                       onClick={(e) => {
                        e.preventDefault();
                        handleDuplicateUser(user);
                      }}>
                        <FontAwesomeIcon
                          icon={faClone}
                          className="icon-option-user"
                        />
                        Duplicar
                      </a>
                      <a className="dropdown-item-user" href="#" onClick={(e) => { e.preventDefault(); handleExport(); }}>
                        <FontAwesomeIcon
                          icon={faFileExport}
                          className="icon-option-user"
                        />
                        Exportar
                      </a>
                      <a
                        className="dropdown-item-user red-text"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteUser(user);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="icon-option-user"
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
