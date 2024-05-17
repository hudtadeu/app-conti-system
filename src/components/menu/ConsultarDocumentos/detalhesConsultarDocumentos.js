import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "./styleDetalhesConsultarDocumentos.css";

function DetalhesConsultarDocumentos({ documento, getStatusInfo }) {
  const [sections, setSections] = useState({
    manutencao: false,
    datas: false,
    contabilizacao: false,
    documentacao: false,
    assinatura: false
  });

  const [activeButton, setActiveButton] = useState('');

  const toggleSection = (section) => {
    setSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section]
    }));
  };

  const handleButtonClick = (button) => {
    setActiveButton(prevButton => (prevButton === button ? '' : button));
  };
  

  return (
    <div className="body-detailsdoc">
      <div className="container-detailsdoc">
        <div className="selected-documento-details">
          <h1 className="title-detailsdoc">Detalhes do Documento</h1>
          <div className="document-info-dcd">
            <div className="document-title-dcd" >
              <p><strong>Documento:</strong> {documento.documento}</p>
              </div>
              <div className="document-details-dcd">
              <div>
              <p><strong>Status:</strong> {getStatusInfo(documento.status).text}</p>
              <p><strong>Fornecedor:</strong> {documento.fornecedor}</p>
            </div>
            <div>
              <p><strong>Série:</strong> {documento.serie}</p>
              <p><strong>Natureza de Operação:</strong> {documento.natureza_operacao}</p>
            </div>
            <div>
            <p><strong>Data de Emissão:</strong> {documento.data_emissao}</p>
            </div>
          </div>
          </div>
        <div className="section-detailsdoc" onClick={() => toggleSection('manutencao')}>
          <h2>Manutenção <FontAwesomeIcon icon={sections.manutencao ? faChevronDown : faChevronRight} /></h2>
          <div className={`section-content-detailsdoc ${sections.manutencao ? 'show' : ''}`}>Conteúdo da Manutenção</div>
        </div>

        <div className="section-detailsdoc" onClick={() => toggleSection('datas')}>
          <h2>Datas <FontAwesomeIcon icon={sections.datas ? faChevronDown : faChevronRight} /></h2>
          <div className={`section-content-detailsdoc ${sections.datas ? 'show' : ''}`}>Conteúdo das Datas</div>
        </div>

        <div className="section-detailsdoc" onClick={() => toggleSection('contabilizacao')}>
          <h2>Contabilização <FontAwesomeIcon icon={sections.contabilizacao ? faChevronDown : faChevronRight} /></h2>
          <div className={`section-content-detailsdoc ${sections.contabilizacao ? 'show' : ''}`}>Conteúdo da Contabilização</div>
        </div>

        <div className="section-detailsdoc" onClick={() => toggleSection('documentacao')}>
          <h2>Documentação <FontAwesomeIcon icon={sections.documentacao ? faChevronDown : faChevronRight} /></h2>
          <div className={`section-content-detailsdoc ${sections.documentacao ? 'show' : ''}`}>Conteúdo da Documentação</div>
        </div>

        <div className="section-detailsdoc" onClick={() => toggleSection('assinatura')}>
          <h2>Assinatura Aprovador <FontAwesomeIcon icon={sections.assinatura ? faChevronDown : faChevronRight} /></h2>
          <div className={`section-content-detailsdoc ${sections.assinatura ? 'show' : ''}`}>Conteúdo da Assinatura Aprovador</div>
        </div>

        <div className="button-bar">
          <button 
            className={activeButton === 'detalhes' ? 'active' : ''} 
            onClick={() => handleButtonClick('detalhes')}
          >
            Detalhes
          </button>
          <button 
            className={activeButton === 'valores' ? 'active' : ''} 
            onClick={() => handleButtonClick('valores')}
          >
            Valores
          </button>
          <button 
            className={activeButton === 'valoresII' ? 'active' : ''} 
            onClick={() => handleButtonClick('valoresII')}
          >
            Valores||
          </button>
          <button 
            className={activeButton === 'observacao' ? 'active' : ''} 
            onClick={() => handleButtonClick('observacao')}
          >
            Observação
          </button>
          <button 
            className={activeButton === 'transp' ? 'active' : ''} 
            onClick={() => handleButtonClick('transp')}
          >
            Transp
          </button>
          <button 
            className={activeButton === 'nf3e' ? 'active' : ''} 
            onClick={() => handleButtonClick('nf3e')}
          >
            NF3e
          </button>
        </div>

        <div className={`content-section ${activeButton === 'detalhes' ? 'show' : ''}`}>
          Conteúdo dos Detalhes
        </div>
        <div className={`content-section ${activeButton === 'valores' ? 'show' : ''}`}>
          Conteúdo dos Valores
        </div>
        <div className={`content-section ${activeButton === 'valoresII' ? 'show' : ''}`}>
          Conteúdo dos Valores||
        </div>
        <div className={`content-section ${activeButton === 'observacao' ? 'show' : ''}`}>
          Conteúdo da Observação
        </div>
        <div className={`content-section ${activeButton === 'transp' ? 'show' : ''}`}>
          Conteúdo do Transporte
        </div>
        <div className={`content-section ${activeButton === 'nf3e' ? 'show' : ''}`}>
          Conteúdo do NF3e
        </div>
      </div>
    </div>
    </div>
  );
}

export default DetalhesConsultarDocumentos;
