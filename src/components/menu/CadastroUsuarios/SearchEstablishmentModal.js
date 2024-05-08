import React, { useState, useEffect, useRef } from "react";
import "./styleSearchEstablishmentModal.css";

function SearchUserEstablishmentModal({ toggleModal, onEstablishmentSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [establishmentList, setEstablishmentList] = useState([]);
  const [displayedEstablishments, setDisplayedEstablishments] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(7);
  const listRef = useRef(null);

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
        const filteredEstablishments = data.items.map((item) => ({
          code: item["code"],
          name: item["name"],
        }));
        setEstablishmentList(filteredEstablishments);
        setDisplayedEstablishments(filteredEstablishments.slice(0, itemsToShow));
      } catch (error) {
        console.error("Erro ao buscar lista de estabelecimentos:", error);
      }
    };

    fetchEstablishments();
  }, [itemsToShow]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = establishmentList.filter(
      (item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.code.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDisplayedEstablishments(filtered.slice(0, itemsToShow));
  };

  const handleEstablishmentSelect = (item) => {
    onEstablishmentSelect(item);
    toggleModal();
  };

  const handleScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setItemsToShow((prev) => prev + 7);
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
  }, [displayedEstablishments]);

  return (
    <div className="modal-backdrop-search-establishment">
      <div className="modal-content-search-establishment">
        <div className="modal-hearder-search-establishment">
          <h2 className="title-modal-search-establishment">Buscar Estabelecimento</h2>
          <button type="button" className="close-button-search-establishment" onClick={toggleModal}>
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
          <div className="list-header-establishment">
            <span className="header-code-establishment">Código</span>
            <span className="header-name-establishment">Nome</span>
          </div>
          <ul className="dropdown-search-establishment" ref={listRef}>
            {displayedEstablishments.map((item) => (
              <li key={item.code} onClick={() => handleEstablishmentSelect(item)}>
                <span className="list-item-code-establishment">{item.code}</span>
                <span className="list-item-name-establishment">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SearchUserEstablishmentModal;