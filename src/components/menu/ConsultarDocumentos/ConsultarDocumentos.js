import React, { useState, useRef } from 'react';
import PesquisaConsultarDocumentos from './pesquisaConsultarDocumentos'; 
import './styleConsultarDocumentos.css';
import { useNavigate } from 'react-router-dom'; // Importando o useNavigate

function ConsultarDocumentos() {
  const [showSearch, setShowSearch] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate(); // Obtendo a função navigate do React Router

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const inputs = Array.from(formRef.current.querySelectorAll('input, select, textarea'));
      const index = inputs.indexOf(event.target);
      if (index !== -1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      } else {
        handleSubmit(event);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowSearch(false);
    setShowResults(true);
    // Navegar para a página PesquisaConsultarDocumentos quando o formulário for submetido
    navigate('/pesquisaConsultarDocumentos');
  };

  return (
    <div className="body-consultardocumentos">
      {showSearch && (
        <div className="container-consultardocumentos">
          <h2 className="consultarDocumentos">Consultar Documentos</h2>
          <h3 className="title-consultarDocumentos">Pesquisar Documentos:</h3>
          <form ref={formRef} className="search-section-consultardocumentos" onKeyDown={handleKeyDown} onSubmit={handleSubmit}>
            <label>
              Serie:
              <input type="text" name="serieDe" />
              até
              <input type="text" name="serieAte" />
            </label>
            <br />
            <label>
              <span>Documento:</span>
              <input type="text" name="documentoDe" />
              até
              <input type="text" name="documentoAte" />
            </label>
            <br />
            <label>
              <span>Fornecedor:</span>
              <input type="text" name="fornecedorDe" />
              até
              <input type="text" name="fornecedorAte" />
            </label>
            <br />
            <label>
              <span>Data de recebimento:</span>
              <input type="date" name="dataRecebimentoDe" />
              até
              <input type="date" name="dataRecebimentoAte" />
            </label>
            <br />
            <label>
              <span>Chave Documento:</span>
              <input type="text" name="chaveDocumentoDe" />
              até
              <input type="text" name="chaveDocumentoAte" />
            </label>
            <br />
            <button type="submit" className="button-primary-consultardocumentos">Pesquisar</button>
          </form>
        </div>
      )}
      {showResults && (
        <PesquisaConsultarDocumentos />
      )}
    </div>
  );
}

export default ConsultarDocumentos;
