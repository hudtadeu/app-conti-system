import React, { useState, useEffect, useRef } from "react";
import "./styleSearchEstablishmentModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function SearchUserEstablishmentModal({ toggleModal, onEstablishmentSelect = (item) => {} }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [establishmentList, setEstablishmentList] = useState([]);
  const [displayedEstablishments, setDisplayedEstablishments] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(20);
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    const fetchEstablishments = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/establishmentsPublic",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${sessionStorage.getItem("token")}`,
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
      } finally {
        setLoading(false);
      }
    };

    fetchEstablishments();
  }, [itemsToShow]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    const filtered = establishmentList.filter(
      (item) =>
        item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    setDisplayedEstablishments(filtered.slice(0, itemsToShow));
  }, [debouncedSearchTerm, establishmentList, itemsToShow]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEstablishmentSelect = (item) => {
    if (item && item.code) {
      onEstablishmentSelect(item);
      toggleModal();
    } else {
      console.warn("Tentando acessar um estabelecimento inválido:", item);
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
  }, [displayedEstablishments]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return (
    <div className="modal-backdrop-search-establishment" onClick={handleBackdropClick}>
      <div className="modal-content-search-establishment">
        <div className="modal-header-search-establishment">
          <h2 className="title-modal-search-establishment">Buscar Estabelecimento</h2>
          <button type="button" className="close-button-search-establishment" onClick={toggleModal}>
            &times;
          </button>
        </div>
        <div className="modal-body-search-establishment">
          <input
            type="text"
            placeholder="Buscar estabelecimento..."
            value={searchTerm}
            onChange={handleSearch}
            className="input-search-establishment"
          />
          <div className="list-header-establishment">
            <span className="header-code-establishment">Código</span>
            <span className="header-name-establishment">Nome</span>
          </div>
          {loading ? (
            <div className="spinner-container">
              <FontAwesomeIcon icon={faSpinner} spin size="2x" />
            </div>
          ) : (
            <ul className="dropdown-search-establishment" ref={listRef}>
              {displayedEstablishments.map((item) => (
                <li key={item.code} onClick={() => handleEstablishmentSelect(item)}>
                  <span className="list-item-code-establishment">{item.code}</span>
                  <span className="list-item-name-establishment">{item.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchUserEstablishmentModal;
