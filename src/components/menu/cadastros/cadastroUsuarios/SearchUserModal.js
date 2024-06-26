import React, { useState, useEffect, useRef, useCallback } from "react";
import "./styleSearchUserModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSpinner } from "@fortawesome/free-solid-svg-icons";

function SearchUserModal({ toggleModal, onUserSelect = (user) => {} }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [userList, setUserList] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(20);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [activeOnly, setActiveOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  const filterAndSetDisplayedUsers = useCallback(
    (users, searchTerm, activeOnly) => {
      let filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.code.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (activeOnly) {
        filtered = filtered.filter((user) => user.ativo === true);
      }

      setDisplayedUsers(filtered.slice(0, itemsToShow));
    },
    [itemsToShow]
  );

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/users",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${sessionStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar usuários");
        }
        const data = await response.json();
        const filteredUsers = data.items.map((user) => ({
          code: user["code"],
          name: user["name"],
          ativo: user["ativo"],
        }));
        setUserList(filteredUsers);
        filterAndSetDisplayedUsers(filteredUsers, debouncedSearchTerm, activeOnly);
      } catch (error) {
        console.error("Erro ao buscar lista de usuários:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [filterAndSetDisplayedUsers, debouncedSearchTerm, activeOnly]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const toggleFilterDropdown = () => {
    setIsFilterDropdownOpen((prev) => !prev);
  };

  const handleFilterToggle = () => {
    const newActiveOnly = !activeOnly;
    setActiveOnly(newActiveOnly);
    filterAndSetDisplayedUsers(userList, debouncedSearchTerm, newActiveOnly);
    setIsFilterDropdownOpen(false);
  };

  const handleUserSelect = (user) => {
    if (user && user.code) {
      onUserSelect(user);
      toggleModal();
    } else {
      console.warn("Tentando acessar um usuário inválido:", user);
    }
  };

  const handleScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setItemsToShow((prev) => prev + 10);
      }
    }
  };

  useEffect(() => {
    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (listElement) {
        listElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [displayedUsers]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return (
    <div className="modal-backdrop-searchuser" onClick={handleBackdropClick}>
      <div className="modal-content-searchuser">
        <div className="modal-searchuser">
          <h2 className="title-searchuser">Buscar Usuário</h2>
          <button
            type="button"
            className="close-button-searchuser"
            onClick={toggleModal}
          >
            &times;
          </button>
        </div>
        <div className="modal-body-searchuser">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Buscar usuário..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input-newuser"
            />
            <div className="filter-dropdown-container">
              <button className="filter-button" onClick={toggleFilterDropdown}>
                <FontAwesomeIcon icon={faFilter} />
                <span className="filter-button-label">
                  {activeOnly ? "Ativos" : "Todos"}
                </span>
              </button>
              {isFilterDropdownOpen && (
                <ul className="filter-dropdown-menu">
                  <li onClick={handleFilterToggle}>
                    {activeOnly ? "Todos" : "Ativos"}
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div className="list-header-newuser">
            <span className="header-code-newuser">Código</span>
            <span className="header-name-newuser">Nome</span>
          </div>
          {loading ? (
            <div className="spinner-container">
              <FontAwesomeIcon icon={faSpinner} spin size="2x" />
            </div>
          ) : (
            <ul className="user-list" ref={listRef}>
              {displayedUsers.map((user) => (
                <li key={user.code} onClick={() => handleUserSelect(user)}>
                  <span className="list-item-code-newuser">{user.code}</span>
                  <span className="list-item-name-newuser">{user.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchUserModal;
