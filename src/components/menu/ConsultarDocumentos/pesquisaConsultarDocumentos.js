import React from 'react';
import "./stylePesquisaConsultarDocumentos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function pesquisaConsultarDocumentos() {
  return (
    <div className="body-pesquisaConsultarDocumetos">
    <div className="container-pesquisaConsultarDocumentos">
      <h1 className="title-pesquisaConsultarDocumentos">Consultar Documentos</h1>
      <div className="controls-container-pesquisaConsultarDocumentos">
      <div className="search-container-pcd">
            <input
              type="text"
              className="search-input-pcd"
              placeholder="Pesquisa rápida"
            />
            <button className="button-search-pcd" type="button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <button
            className="button-primary-pcd"
          >
            Outras Opções
          </button>
      </div>
    </div>
    </div>
  );
}

export default pesquisaConsultarDocumentos;
