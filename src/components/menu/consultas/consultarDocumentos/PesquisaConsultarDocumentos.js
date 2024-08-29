/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import ModalPesquisaConsultarDocumentos from './ModalPesquisaConsultarDocumentos'; // Certifique-se de importar o modal corretamente
import './stylePesquisaConsultarDocumentos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLongArrowAltUp, faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { getStatusInfo, getTipoDocumentoInfo } from '../../../utils';

function PesquisaConsultarDocumentos() {
  const location = useLocation();
  const navigate = useNavigate();
  const [documentData, setDocumentData] = useState(location.state?.documentData || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'emissao', direction: 'ascending' });

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

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
  };

  const sortedDocumentData = [...documentData].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (sortConfig.key === 'emissao') {
      return sortConfig.direction === 'ascending'
        ? new Date(aValue) - new Date(bValue)
        : new Date(bValue) - new Date(aValue);
    }

    return sortConfig.direction === 'ascending'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const filteredDocumentData = sortedDocumentData
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
    });

  const renderSortIcons = (key) => (
    <span className="sort-icons-pcd" onClick={() => handleSort(key)}>
      <FontAwesomeIcon icon={faLongArrowAltUp} className={`sort-icon ${sortConfig.key === key && sortConfig.direction === 'ascending' ? 'active' : ''}`} />
      <FontAwesomeIcon icon={faLongArrowAltDown} className={`sort-icon ${sortConfig.key === key && sortConfig.direction === 'descending' ? 'active' : ''}`} />
    </span>
  );

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
                <th onClick={() => handleSort('nro_docto')}>
                  <span>Número {renderSortIcons('nro_docto')}</span>
                </th>
                <th onClick={() => handleSort('forneced')}>
                  <span>Fornecedor {renderSortIcons('forneced')}</span>
                </th>
                <th onClick={() => handleSort('serie_docto')}>
                  <span>Série {renderSortIcons('serie_docto')}</span>
                </th>
                <th onClick={() => handleSort('nat_operacao')}>
                  <span>Natureza da Operação {renderSortIcons('nat_operacao')}</span>
                </th>
                <th onClick={() => handleSort('emissao')}>
                  <span>Data de Emissão {renderSortIcons('emissao')}</span>
                </th>
                <th>Status</th>
                <th onClick={() => handleSort('tipo_doc')}>
                  <span>Tipo Documento {renderSortIcons('tipo_doc')}</span>
                </th>
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
