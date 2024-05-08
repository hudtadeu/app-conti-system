import React, { useState, useEffect, useRef } from "react";
import "./styleSearchUserModal.css";

function SearchUserModal({ onUserSelect, toggleModal }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [userList, setUserList] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(20);
  const listRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://131.161.43.14:8280/dts/datasul-rest/resources/prg/cdp/v1/users",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${sessionStorage.getItem("token")}`, // Substitua se necessário
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
          }));
          setUserList(filteredUsers);
          setDisplayedUsers(filteredUsers.slice(0, itemsToShow));
        } catch (error) {
          console.error("Erro ao buscar lista de usuários:", error);
        }
      };

    fetchUsers();
  }, [itemsToShow]);


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = userList.filter(
      (user) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.code.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDisplayedUsers(filtered.slice(0, itemsToShow));
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
    if (listRef.current) {
      listRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (listRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        listRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [displayedUsers]);

  return (
    <div className="modal-backdrop-searchuser">
      <div className="modal-content-searchuser">
        <div className="modal-searchuser">
          <h2 className="title-searchuser">Buscar Usuário</h2>
          <button type="button" className="close-button-searchuser" onClick={toggleModal}>
            &times;
          </button>
        </div>
        <div className="modal-body-searchuser">
          <input
            type="text"
            placeholder="Buscar usuário..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input-newuser"
          />
           <div className="list-header-newuser">
            <span className="header-code-newuser">Código</span>
            <span className="header-name-newuser">Nome</span>
          </div>
           <ul className="user-list" ref={listRef}>
            {displayedUsers.map((user) => (
              <li key={user.code} onClick={() => handleUserSelect(user)}>
                <span className="list-item-code-newuser">{user.code}</span>
                <span className="list-item-name-newuser">{user.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SearchUserModal;
