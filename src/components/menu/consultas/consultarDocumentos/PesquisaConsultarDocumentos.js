/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import ModalPesquisaConsultarDocumentos from './ModalPesquisaConsultarDocumentos'; // Certifique-se de importar o modal corretamente
import './stylePesquisaConsultarDocumentos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { getStatusInfo, getTipoDocumentoInfo } from '../../../utils';

function PesquisaConsultarDocumentos() {
  const location = useLocation();
  const navigate = useNavigate();
  const [documentData, setDocumentData] = useState(location.state?.documentData || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1); 
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  };

  const handleDocumentoClick = (documento) => {
    navigate('/detalhesConsultarDocumentos', { state: { cId: documento.cId } });
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDropdownToggle = (index, event) => {
    event.stopPropagation();
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (data) => {
    setDocumentData(data);
    handleCloseModal(); 
  };

  const sortDocumentsByDate = (a, b) => {
    return new Date(b.emissao) - new Date(a.emissao);
  };

  const filteredDocumentData = documentData
    .filter(documento => {
      return (
        documento.nro_docto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        documento.situacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        documento.forneced.toLowerCase().includes(searchTerm.toLowerCase()) ||
        documento.serie_docto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        documento.nat_operacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        documento.tipo_doc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        documento.emissao.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort(sortDocumentsByDate); 

  return (
    <div className="body-pesquisaConsultarDocumentos">
      <div className="container-pesquisaConsultarDocumentos">
        <h1 className="title-pesquisaConsultarDocumentos">Consultar Documentos</h1>
        <div className="controls-container-pesquisaConsultarDocumentos">
          <button className="button-primary-pcd" onClick={handleOpenModal}>
            Filtrar Documentos
          </button>
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
                  <tr key={index} onClick={() => handleDocumentoClick(documento)}>
                    <td>{documento.nro_docto.toUpperCase()}</td>
                    <td>{documento.forneced}</td>
                    <td>{documento.serie_docto}</td>
                    <td>{documento.nat_operacao}</td>
                    <td>{formatDate(documento.emissao)}</td>
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
                      <div 
                        className="dropdown" 
                        onMouseEnter={(event) => handleDropdownToggle(index, event)} 
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <button className="dropbtn" onClick={(event) => handleDropdownToggle(index, event)}>...</button>
                        <div className={`dropdown-content ${activeDropdown === index ? 'show' : ''}`}>
                          <a href="#">Opção 1</a>
                          <a href="#">Opção 2</a>
                          <a href="#">Opção 3</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {isModalOpen && (
          <ModalPesquisaConsultarDocumentos 
            onSubmit={handleSearch} 
            closeModal={handleCloseModal} 
          />
        )}
      </div>
    </div>
  );
}

export default PesquisaConsultarDocumentos;
