import React, { useState, useEffect } from "react";
import "./styleSearchEstablishmentModal.css";

function SearchUserModal({ toggleModal, onEstablishmentSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [establishmentList, setEstablishmentList] = useState([]);

  useEffect(() => {
    const fetchEstablishments = async () => {
      try {
        const response = await fetch(
          "http://131.161.43.14:8280/dts/datasul-rest/resources/prg/cdp/v1/establishmentsPublic",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${sessionStorage.getItem("token")}`, // Substitua se necessário
            },
          }
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar estabelecimentos");
        }
        const data = await response.json();
        const filteredEstablishments = data.items.map((establishment) => ({
          code: establishment["code"],
          name: establishment["name"],
        }));
        setEstablishmentList(filteredEstablishments);
      } catch (error) {
        console.error("Erro ao buscar lista de estabelecimentos:", error);
      }
    };

    fetchEstablishments();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEstablishments = establishmentList.filter((establishment) =>
    establishment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEstablishmentSelect = (user) => {
    onEstablishmentSelect(user);
    toggleModal();
  };

  return (
    <div className="modal-backdrop-search-establishment">
      <div className="modal-content-search-establishment">
        <div className="modal-hearder-search-establishment">
          <h2>Buscar Estabelecimento</h2>
          <button type="button" className="close-button-search-establishement" onClick={toggleModal}>
            &times;
          </button>
        </div>
        <div className="modal-body-search-establishment">
          <input
            type="text"
            placeholder="Buscar usuário..."
            value={searchTerm}
            onChange={handleSearch}
            className="input-search-establishment"
          />
          <ul className="dropdown-search-establishment">
            {filteredEstablishments.map((establishment) => (
              <li key={establishment.code} onClick={() => handleEstablishmentSelect(establishment)}>
                {establishment.name} ({establishment.code})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SearchUserModal;