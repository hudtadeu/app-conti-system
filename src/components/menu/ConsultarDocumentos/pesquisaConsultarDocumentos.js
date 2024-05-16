/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './stylePesquisaConsultarDocumentos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function PesquisaConsultarDocumentos() {
  const documentos = [
    {
      fornecedor: 'Fornecedor 1',
      documento: 'Documento 1',
      serie: 'Série 1',
      natureza_operacao: 'Natureza 1',
      data_emissao: '01/03/2024',
      status: 1
    },
    {
      fornecedor: 'Fornecedor 2',
      documento: 'Documento 2',
      serie: 'Série 2',
      natureza_operacao: 'Natureza 2',
      data_emissao: '02/03/2024',
      status: 2
    },
    {
      fornecedor: 'Fornecedor 3',
      documento: 'Documento 3',
      serie: 'Série 3',
      natureza_operacao: 'Natureza 3',
      data_emissao: '03/03/2024',
      status: 3
    }
  ];

  const getStatusInfo = (status) => {
    let statusText;
    let statusColor;
    switch (status) {
      case 1:
        statusText = 'Pendente';
        statusColor = '#FFD700'; 
        break;
      case 2:
        statusText = 'Atualizado';
        statusColor = '#008000'; 
        break;
      case 3:
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

  return (
    <div className="body-pesquisaConsultarDocumentos">
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
          {documentos.map((documento, index) => {
            const statusInfo = getStatusInfo(documento.status);
            return (
              <div className="documento-item-pcd" key={index}>
                <div className="documento-titulo-pcd">
                  <p>{documento.documento.toUpperCase()}</p>
                </div>
                <div className="documento-detalhes-pcd">
                  <div className="documento-status-fornecedor-pcd">
                    <div className="status-container">
                      <span className="status-circle" style={{ backgroundColor: statusInfo.color }}>{documento.status}</span>
                      <div className="status-description" style={{ backgroundColor: statusInfo.color }}>{statusInfo.text}</div>
                    </div>
                    <p>{documento.fornecedor}</p>
                  </div>
                  <div className="documento-serie-natureza-pcd">
                    <p><strong>Série:</strong> {documento.serie}</p>
                    <p><strong>Natureza de Operação:</strong> {documento.natureza_operacao}</p>
                  </div>
                  <div className="documento-data-pcd">
                    <p><strong>Data de Emissão:</strong> {documento.data_emissao}</p>
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
    </div>
  );
}

export default PesquisaConsultarDocumentos;
