/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback, useRef } from "react";
import "./styleCadastroUsuarios.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
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
import { utils, writeFile } from 'xlsx'; // Importação da biblioteca xlsx
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
  const [overlayLoading, setOverlayLoading] = useState(false); // Estado separado para o overlay
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const fetchUsers = useCallback(() => {
    const base64Credentials = sessionStorage.getItem("token");
    if (!base64Credentials) {
      console.error("base64Credentials not found in sessionStorage");
      return;
    }

    setLoading(true);

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
      .catch((error) => console.error("Erro ao carregar dados da API:", error))
      .finally(() => setLoading(false));
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
    setShowNewUserModal(!showNewUserModal);
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
    setOverlayLoading(true);
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
      setOverlayLoading(false);
    }
  };

  const updateUser = async (updatedUser) => {
    setOverlayLoading(true);
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
      setOverlayLoading(false);
    }
  };

  const addNewUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleDuplicateUser = (user) => {
    const newUserCode = `${user["cod-usuario"]}${Date.now()}`;
    const newUser = { ...user, "cod-usuario": newUserCode };
    addNewUser(newUser);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleExport = (user) => {
    setOverlayLoading(true);
    const dataToExport = [{
      Usuário: user["cod-usuario"],
      Estabelecimento: user["cod-estabel"],
      Importa: user["l-importa"] ? "Sim" : "Não",
      Elimina: user["l-elimina"] ? "Sim" : "Não",
      Cancela: user["l-cancela-doc"] ? "Sim" : "Não",
      Altera: user["l-altera-cfop"] ? "Sim" : "Não",
      Atualiza: user["l-atualiza"] ? "Sim" : "Não",
      Efetua: user["l-efetua-download"] ? "Sim" : "Não",
      Arquiva: user["l-arquiva-xml"] ? "Sim" : "Não",
      Manifesta: user["l-manifesta"] ? "Sim" : "Não",
      Prioriza: user["l-prioriza-documento"] ? "Sim" : "Não",
      "Rec.Fiscal": user["l-recebe-fiscal"] ? "Sim" : "Não",
      "Rec.Físico": user["l-recebe-fisico"] ? "Sim" : "Não",
    }];

    const worksheet = utils.json_to_sheet(dataToExport);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "User");
    writeFile(workbook, `Usuario_${user["cod-usuario"]}.xlsx`);

    setTimeout(() => {
      setOverlayLoading(false);
    }, 2000);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });

    const sortedUsers = [...filteredUsers].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'ascending' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
        return direction === 'ascending' ? (aValue === bValue ? 0 : aValue ? -1 : 1) : (aValue === bValue ? 0 : aValue ? 1 : -1);
      }
      return 0;
    });

    setFilteredUsers(sortedUsers);
  };

  return (
    <div className="body-usuario">
      {overlayLoading && (
        <div className="overlay-cadastro-usuarios">
          <div className="loading-container-usuarios">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
          </div>
        </div>
      )}
      <div className={`container-usuario ${overlayLoading ? "blur" : ""}`}>
        <h1 className="cadastroUsuario">Cadastro de Usuários</h1>
        <br />
        <SearchComponent toggleModal={toggleNewUserModal} onSearch={handleSearch} />
        <UserTable
          users={filteredUsers}
          openViewModal={openViewModal}
          openEditModal={openEditModal}
          deleteUser={deleteUser}
          handleDuplicateUser={handleDuplicateUser}
          handleExport={handleExport}
          loading={loading}
          handleSort={handleSort}
          sortConfig={sortConfig}
        />
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

function UserTable({ users, openViewModal, openEditModal, deleteUser, handleDuplicateUser, handleExport, loading, handleSort, sortConfig }) {
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

  const renderSortIcons = (key) => (
    <span className="sort-icons-user" onClick={() => handleSort(key)}>
      <FontAwesomeIcon icon={faLongArrowAltUp} className={`sort-icon ${sortConfig.key === key && sortConfig.direction === 'ascending' ? 'active' : ''}`} />
      <FontAwesomeIcon icon={faLongArrowAltDown} className={`sort-icon ${sortConfig.key === key && sortConfig.direction === 'descending' ? 'active' : ''}`} />
    </span>
  );

  return (
    <div className="table-responsive-usuario">
      <table className="user-table">
        <thead>
          <tr className="user-title">
            <th scope="col">Usuário</th>
            <th scope="col">Estabelecimento</th>
            {[
              { label: "Importa", key: "l-importa" },
              { label: "Elimina", key: "l-elimina" },
              { label: "Cancela", key: "l-cancela-doc" },
              { label: "Altera", key: "l-altera-cfop" },
              { label: "Atualiza", key: "l-atualiza" },
              { label: "Efetua", key: "l-efetua-download" },
              { label: "Arquiva", key: "l-arquiva-xml" },
              { label: "Manifesta", key: "l-manifesta" },
              { label: "Prioriza", key: "l-prioriza-documento" },
              { label: "Rec.Fiscal", key: "l-recebe-fiscal" },
              { label: "Rec.Físico", key: "l-recebe-fisico" },
            ].map((action, index) => (
              <th key={index} scope="col" className="header-with-icon" onClick={() => handleSort(action.key)}>
                {action.label}
                {renderSortIcons(action.key)}
              </th>
            ))}
            <th scope="col">
              <FontAwesomeIcon icon={faCog} />
            </th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan="14" className="loading-spinner-user">
                <div className="spinner-container-user">
                  <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                </div>
              </td>
            </tr>
          )}
          {!loading &&
            users.map((user, index) => (
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
                        icon={faCheck}
                        className="text-success"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faTimes}
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
                        <a className="dropdown-item-user" href="#" onClick={(e) => { e.preventDefault(); handleExport(user); }}>
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
