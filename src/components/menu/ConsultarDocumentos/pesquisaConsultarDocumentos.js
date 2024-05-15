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
      data_emissao: 'Data 1'
    },
    {
      fornecedor: 'Fornecedor 2',
      documento: 'Documento 2',
      serie: 'Série 2',
      natureza_operacao: 'Natureza 2',
      data_emissao: 'Data 2'
    },
    {
      fornecedor: 'Fornecedor 3',
      documento: 'Documento 3',
      serie: 'Série 3',
      natureza_operacao: 'Natureza 3',
      data_emissao: 'Data 3'
    }
  ];

  return (
    <div className="body-pesquisaConsultarDocumentos">
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
          <button className="button-primary-pcd">Outras Opções</button>
        </div>
        <div className="lista-documentos-pcd">
          {documentos.map((documento, index) => (
            <div className="documento-item-pcd" key={index}>
                 <div>
              <p>Fornecedor: {documento.fornecedor}</p>
              <p>Documento: {documento.documento}</p>
              </div>
              <div className="documento-item-sub-pcd">
              <p>Série: {documento.serie}</p>
              <p>Natureza de Operação: {documento.natureza_operacao}</p>
              <p>Data de Emissão: {documento.data_emissao}</p>
              <div>
              <button className="button-secondary-pcd">Outras Opções</button>
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PesquisaConsultarDocumentos;
