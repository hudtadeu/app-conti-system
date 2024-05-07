// SearchUserModal.js
import React, { useState, useEffect } from "react";
//import "./styleSearchUserModal.css";

function SearchUserModal({ toggleModal, onUserSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [userList, setUserList] = useState([]);

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
      } catch (error) {
        console.error("Erro ao buscar lista de usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = userList.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserSelect = (user) => {
    onUserSelect(user);
    toggleModal();
  };

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
            className="search-input"
          />
          <ul className="user-list">
            {filteredUsers.map((user) => (
              <li key={user.code} onClick={() => handleUserSelect(user)}>
                {user.name} ({user.code})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SearchUserModal;
