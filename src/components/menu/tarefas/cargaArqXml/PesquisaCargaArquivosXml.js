import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { getStatusInfo, getTipoDocumentoInfo } from '../../../utils';
import ModalCargaArquivosXml from './ModalCargaArquivosXml';

function PesquisaCargaArquivosXml() {
  const location = useLocation();
  const { documentData: initialDocumentData } = location.state || { documentData: [] };
  const [documentData, setDocumentData] = useState(initialDocumentData || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const modalRef = useRef(null);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const openFilterModal = (event) => {
    event.stopPropagation();
    setIsFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleFilterSubmit = (filteredData) => {
    setDocumentData(filteredData);  // Atualiza os dados da tabela
    closeFilterModal();  // Fecha o modal após a atualização dos dados
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeFilterModal();
    }
  };

  useEffect(() => {
    if (isFilterModalOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isFilterModalOpen]);

  const filteredDocumentData = documentData
    .filter(documento => documento.situacao.toLowerCase() === 'pendente')
    .filter(documento => {
      return (
        documento.nro_docto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        documento.forneced.toLowerCase().includes(searchTerm.toLowerCase()) ||
        documento.serie_docto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        documento.nat_operacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        documento.tipo_doc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        documento.emissao.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  return (
    <div className="body-pesquisaConsultarDocumentos">
      <div className="container-pesquisaConsultarDocumentos">
        <h1 className="title-pesquisaConsultarDocumentos">Carga de Arquivos Xml</h1>
        <div className="controls-container-pesquisaConsultarDocumentos">
          <button className="button-primary-pcd" onClick={openFilterModal}>Filtrar Documentos</button>
          <div className="search-container-pcd">
            <input
              type="text"
              className="search-input-pcd"
              placeholder="Pesquisa rápida"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
            <button className="button-search-pcd" type="button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        <div className="table-container">
          <table className="table-documentos-pcd">
            <thead>
              <tr>
                <th>Número</th>
                <th>Fornecedor</th>
                <th>Série</th>
                <th>Natureza da Operação</th>
                <th>Data de Emissão</th>
                <th>Status</th>
                <th>Tipo Documento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocumentData.map((documento, index) => {
                const statusInfo = getStatusInfo(documento.situacao);
                const tipoDocumentoInfo = getTipoDocumentoInfo(documento.tipo_doc);
                return (
                  <tr key={index}>
                    <td>{documento.nro_docto.toUpperCase()}</td>
                    <td>{documento.forneced}</td>
                    <td>{documento.serie_docto}</td>
                    <td>{documento.nat_operacao}</td>
                    <td>{documento.emissao}</td>
                    <td>
                      <div className="status-description" style={{ backgroundColor: statusInfo.color }}>
                        {statusInfo.text}
                      </div>
                    </td>
                    <td>
                      <div className="tipo-description" style={{ backgroundColor: tipoDocumentoInfo.color }}>
                        {tipoDocumentoInfo.text}
                      </div>
                    </td>
                    <td>
                      <div className="dropdown" title="Outras opções">
                        <button className="dropbtn">...</button>
                        <div className="dropdown-content">
                          <a href="#">Atualizar EMS</a>
                          <a href="#">Priorizar</a>
                          <a href="#">Confirmar</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {isFilterModalOpen && (
          <div className="modal-carga" ref={modalRef}>
            <ModalCargaArquivosXml onSubmit={handleFilterSubmit} closeModal={closeFilterModal} />
          </div>
        )}
      </div>
    </div>
  );
}

export default PesquisaCargaArquivosXml;
