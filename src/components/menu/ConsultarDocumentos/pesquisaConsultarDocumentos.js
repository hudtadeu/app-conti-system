import React, { useState, useEffect } from 'react';
import './stylePesquisaConsultarDocumentos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { getStatusInfo, getTipoDocumentoInfo } from '../../utils'; 

function PesquisaConsultarDocumentos() {
  const location = useLocation();
  const navigate = useNavigate();
  const { documentData } = location.state || { documentData: [] };
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("Dados recebidos na nova tela:", documentData);
  }, [documentData]);

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

  const filteredDocumentData = documentData.filter(documento => {
    return (
      documento.nro_docto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      documento.situacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      documento.forneced.toLowerCase().includes(searchTerm.toLowerCase()) ||
      documento.serie_docto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      documento.nat_operacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      documento.emissao.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
            <button className="button-search-pcd" type="button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        <div className="lista-documentos-pcd">
          {filteredDocumentData.map((documento, index) => {
            const statusInfo = getStatusInfo(documento.situacao);
            const tipoDocumentoInfo = getTipoDocumentoInfo(documento.tipo_doc);
            return (
              <div className="documento-item-pcd" key={index} onClick={() => handleDocumentoClick(documento)}>
                <div className="documento-titulo-pcd">
                  <p>{documento.nro_docto.toUpperCase()}</p>
                </div>
                <div className="documento-detalhes-pcd">
                  <div className="documento-status-fornecedor-pcd">
                    <div className="status-container">
                      <div className="status-description" style={{ backgroundColor: statusInfo.color }}>{statusInfo.text}</div>
                      <div className="tipo-container">
                        <div className="tipo-description" style={{ backgroundColor: tipoDocumentoInfo.color }}>{tipoDocumentoInfo.text}</div>
                      </div>
                    </div>
                    <p className='title-forneced-pcd'>{documento.forneced}</p>
                  </div>
                  <div className="documento-serie-natureza-pcd">
                    <p><strong>Série:</strong> {documento.serie_docto}</p>
                    <p><strong>Natureza da Operação:</strong> {documento.nat_operacao}</p>
                  </div>
                  <div className="documento-data-pcd">
                    <p><strong>Data de Emissão:</strong> {formatDate(documento.emissao)}</p>
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
