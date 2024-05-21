import React, { useState, useRef } from 'react';
import PesquisaConsultarDocumentos from './pesquisaConsultarDocumentos';
import './styleConsultarDocumentos.css';
import { useNavigate } from 'react-router-dom';

function ConsultarDocumentos() {
  const [showSearch, setShowSearch] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [documentData, setDocumentData] = useState(null);
  const formRef = useRef(null);
  const navigate = useNavigate();

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

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    const date = new Date(`${year}-${month}-${day}`);
    const formattedDay = String(date.getDate()).padStart(2, '0');
    const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
    const formattedYear = date.getFullYear();
    return `${formattedDay}${formattedMonth}${formattedYear}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowSearch(false);
    setShowResults(true);

    const formData = new FormData(formRef.current);
    const payload = {
      cod_estabel_ini: formData.get('codEstabelIni') || "1",
      cod_estabel_fim: formData.get('codEstabelFim') || "2",
      dat_ini: formatDate(formData.get('dataRecebimentoDe')) || "01012024",
      dat_fim: formatDate(formData.get('dataRecebimentoAte')) || "31122024",
      serie_docto_ini: formData.get('serieDe') || "",
      serie_docto_fim: formData.get('serieAte') || "ZZZZZ",
      nro_docto_ini: formData.get('documentoDe') || "",
      nro_docto_fim: formData.get('documentoAte') || "ZZZZZZZZZZZZZZZZ",
      fornecedor_ini: formData.get('fornecedorDe') || 0,
      fornecedor_fim: formData.get('fornecedorAte') || 999999999,
    };

    console.log("Payload enviado:", payload);
    const base64Credentials = sessionStorage.getItem("token");
    
    try {
      const response = await fetch(
        `http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/piGetDocumXML`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${base64Credentials}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar documentos");
      }

      const data = await response.json();
      console.log("Dados recebidos:", data);
      if (data && data.items && data.items.length > 0) {
        setDocumentData(data.items);
        navigate('/pesquisaConsultarDocumentos');
      } else {
        console.error("Nenhum item encontrado na resposta.");
      }
    } catch (error) {
      console.error("Erro ao buscar documentos:", error);
    }
  };

  return (
    <div className="body-consultardocumentos">
      {showSearch && (
        <div className="container-consultardocumentos">
          <h2 className="consultarDocumentos">Consultar Documentos</h2>
          <h3 className="title-consultarDocumentos">Pesquisar Documentos:</h3>
          <form ref={formRef} className="search-section-consultardocumentos" onKeyDown={handleKeyDown} onSubmit={handleSubmit}>
            <label>
              Cod. Estabelecimento:
              <input type="text" name="codEstabelIni" />
              até
              <input type="text" name="codEstabelFim" />
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
              <span>Série Documento:</span>
              <input type="text" name="serieDe" />
              até
              <input type="text" name="serieAte" />
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
        <PesquisaConsultarDocumentos documentData={documentData} />
      )}
    </div>
  );
}

export default ConsultarDocumentos;
