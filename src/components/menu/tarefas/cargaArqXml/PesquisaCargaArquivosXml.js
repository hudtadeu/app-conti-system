/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLongArrowAltUp, faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { getStatusInfo, getTipoDocumentoInfo } from '../../../utils';
import ModalCargaArquivosXml from './ModalCargaArquivosXml';
import './stylePesquisaCargaArquivosXml.css';

function PesquisaCargaArquivosXml() {
  const location = useLocation();
  const navigate = useNavigate();
  const { documentData: initialDocumentData } = location.state || { documentData: [] };
  const [documentData, setDocumentData] = useState(initialDocumentData || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'emissao', direction: 'descending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditingPage, setIsEditingPage] = useState(false); 
  const [inputPage, setInputPage] = useState(currentPage); 
  const itemsPerPage = 11; 
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
    setDocumentData(filteredData);
    closeFilterModal();
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

  const handleMouseEnter = (index) => {
    setOpenDropdownIndex(index);
  };

  const handleMouseLeave = () => {
    setOpenDropdownIndex(null);
  };

  const handleAtualizarEMSClick = () => {
    navigate('/atualizarDocumento');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1); 
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
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
    if (a.priorizado && !b.priorizado) return -1;
    if (!a.priorizado && b.priorizado) return 1;
    if (a.confirmado && !b.confirmado) return -1;
    if (!a.confirmado && b.confirmado) return 1;

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDocumentData.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredDocumentData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
      setInputPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setInputPage(currentPage - 1);
    }
  };

  const handlePageNumberClick = () => {
    setIsEditingPage(true);
  };

  const handlePageInputChange = (event) => {
    setInputPage(event.target.value);
  };

  const handlePageInputBlur = () => {
    if (inputPage >= 1 && inputPage <= Math.ceil(filteredDocumentData.length / itemsPerPage)) {
      setCurrentPage(Number(inputPage));
    }
    setIsEditingPage(false);
  };

  const handlePageInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      handlePageInputBlur();
    }
  };

  const renderSortIcons = (key) => (
    <span className="sort-icons-carga">
      <FontAwesomeIcon icon={faLongArrowAltUp} className={`sort-icon ${sortConfig.key === key && sortConfig.direction === 'ascending' ? 'active' : ''}`} />
      <FontAwesomeIcon icon={faLongArrowAltDown} className={`sort-icon ${sortConfig.key === key && sortConfig.direction === 'descending' ? 'active' : ''}`} />
    </span>
  );

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
                <th onClick={() => handleSort('nro_docto')}>
                  <span>
                    Número {renderSortIcons('nro_docto')}
                  </span>
                </th>
                <th onClick={() => handleSort('forneced')}>
                  <span>
                    Fornecedor {renderSortIcons('forneced')}
                  </span>
                </th>
                <th onClick={() => handleSort('serie_docto')}>
                  <span>
                    Série {renderSortIcons('serie_docto')}
                  </span>
                </th>
                <th onClick={() => handleSort('nat_operacao')}>
                  <span>
                    Natureza da Operação {renderSortIcons('nat_operacao')}
                  </span>
                </th>
                <th onClick={() => handleSort('emissao')}>
                  <span>
                    Data de Emissão {renderSortIcons('emissao')}
                  </span>
                </th>
                <th>Status</th>
                <th onClick={() => handleSort('tipo_doc')}>
                  <span>
                    Tipo Documento {renderSortIcons('tipo_doc')}
                  </span>
                </th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((documento, index) => {
                const statusInfo = getStatusInfo(documento.situacao);
                const tipoDocumentoInfo = getTipoDocumentoInfo(documento.tipo_doc);
                return (
                  <tr key={index}>
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
                        className="dropdown-container" 
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <button className="dropbtn">...</button>
                        {openDropdownIndex === index && (
                          <div className="dropdown-content">
                            <a href="#" onClick={handleAtualizarEMSClick}>Atualizar EMS</a>
                            <a href="#">Priorizar</a>
                            <a href="#">Confirmar</a>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="pagination-container">
          <button onClick={prevPage} disabled={currentPage === 1} className="page-item">
            Anterior
          </button>
          {isEditingPage ? (
            <input
              type="number"
              value={inputPage}
              onChange={handlePageInputChange}
              onBlur={handlePageInputBlur}
              onKeyPress={handlePageInputKeyPress}
              className="page-input"
            />
          ) : (
            <span className="page-number" onClick={handlePageNumberClick}>
              Página {currentPage}
            </span>
          )}
          <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredDocumentData.length / itemsPerPage)} className="page-item">
            Próxima
          </button>
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
