/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import './stylePesquisaConsultarDocumentos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import DetalhesConsultarDocumentos from './detalhesConsultarDocumentos';

function PesquisaConsultarDocumentos({ documentData }) {
  const [selectedDocumento, setSelectedDocumento] = useState(null);
  const [documentosAPI, setDocumentosAPI] = useState([]);

  useEffect(() => {
    if (documentData && documentData.items) {
      setDocumentosAPI(documentData.items);
    }
  }, [documentData]);

  const getStatusInfo = (situacao) => {
    let statusText;
    let statusColor;
    switch (situacao) {
      case 'Pendente':
        statusText = 'Pendente';
        statusColor = '#FFD700';
        break;
      case 'Atualizado':
        statusText = 'Atualizado';
        statusColor = '#008000';
        break;
      case 'Cancelado':
        statusText = 'Cancelado';
        statusColor = '#FF0000';
        break;
      default:
        statusText = 'Status Desconhecido';
        statusColor = '#808080';
        break;
    }
    return { text: statusText, color: statusColor };
  };

  const handleDocumentoClick = (documento) => {
    setSelectedDocumento(documento);
  };

  return (
    <div className="body-pesquisaConsultarDocumentos">
      {!selectedDocumento && (
        <div className="container-pesquisaConsultarDocumentos">
          <h1 className="title-pesquisaConsultarDocumentos">Consultar Documentos</h1>
          <div className="controls-container-pesquisaConsultarDocumentos">
            <button className="button-primary-pcd">Outras Opções</button>
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
          </div>
          <div className="lista-documentos-pcd">
            {documentosAPI.map((documento, index) => {
              const statusInfo = getStatusInfo(documento.situacao);
              return (
                <div className="documento-item-pcd" key={index} onClick={() => handleDocumentoClick(documento)}>
                  <div className="documento-titulo-pcd">
                    <p>{documento.nro_docto.toUpperCase()}</p>
                  </div>
                  <div className="documento-detalhes-pcd">
                    <div className="documento-status-fornecedor-pcd">
                      <div className="status-container">
                        <span className="status-circle" style={{ backgroundColor: statusInfo.color }}></span>
                        <div className="status-description" style={{ backgroundColor: statusInfo.color }}>{statusInfo.text}</div>
                      </div>
                      <p>{documento.forneced}</p>
                    </div>
                    <div className="documento-serie-natureza-pcd">
                      <p><strong>Série:</strong> {documento.serie_docto}</p>
                      <p><strong>Natureza de Operação:</strong> {documento.tipo_doc}</p>
                    </div>
                    <div className="documento-data-pcd">
                      <p><strong>Data de Emissão:</strong> {documento.emissao}</p>
                    </div>
                    <div className="documento-acoes-pcd">
                      <div className="dropdown" title="Outras opções">
                        <button className="dropbtn">...</button>
                        <div className="dropdown-content">
                          <a href="#">Opção 1</a>
                          <a href="#">Opção 2</a>
                          <a href="#">Opção 3</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {selectedDocumento && (
        <DetalhesConsultarDocumentos documento={selectedDocumento} />
      )}
    </div>
  );
}

export default PesquisaConsultarDocumentos;
