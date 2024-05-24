import React, { useState, useRef, useEffect } from 'react';
import PesquisaConsultarDocumentos from './PesquisaConsultarDocumentos';
import './styleConsultarDocumentos.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function ConsultarDocumentos() {
  const [showSearch, setShowSearch] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [documentData, setDocumentData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('consultarDocumentosFormData'));
    if (savedFormData) {
      const form = formRef.current;
      Object.keys(savedFormData).forEach((fieldName) => {
        const field = form.elements[fieldName];
        if (field) {
          field.value = savedFormData[fieldName];
        }
      });
    }
  }, []);
  
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
    const [year, month, day] = dateString.split('-');
    return `${day.padStart(2, '0')}${month.padStart(2, '0')}${year}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(formRef.current);
    const dataRecebimentoDe = formData.get('dataRecebimentoDe');
    const dataRecebimentoAte = formData.get('dataRecebimentoAte');
    const selectedTipoDocumento = formData.get('tipoDocumento');

    if (!selectedTipoDocumento || selectedTipoDocumento === '') {
      setError('Por favor, selecione um tipo de documento.');
      setLoading(false);
      return;
    }

    const payload = {
      cod_estabel_ini: formData.get('codEstabelIni') || "1",
      cod_estabel_fim: formData.get('codEstabelFim') || "2",
      dat_ini: formatDate(dataRecebimentoDe),
      dat_fim: formatDate(dataRecebimentoAte),
      serie_docto_ini: formData.get('serieDe') || "",
      serie_docto_fim: formData.get('serieAte') || "ZZZZZ",
      nro_docto_ini: formData.get('documentoDe') || "",
      nro_docto_fim: formData.get('documentoAte') || "ZZZZZZZZZZZZZZZZ",
      fornecedor_ini: formData.get('fornecedorDe') || 0,
      fornecedor_fim: formData.get('fornecedorAte') || 999999999,
      tipo_doc: selectedTipoDocumento,
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
        navigate('/pesquisaConsultarDocumentos', { state: { documentData: data.items } });

        localStorage.setItem('consultarDocumentosFormData', JSON.stringify(Object.fromEntries(formData.entries())));
      } else {
        setError("Nenhum item encontrado na resposta.");
      }
    } catch (error) {
      setError("Erro ao buscar documentos.");
      console.error("Erro ao buscar documentos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTipoDocumentoChange = (e) => {
    setDocumentData(null); 
    setError('');
  };

  return (
    <div className="body-consultardocumentos">
      {showSearch && (
        <div className="container-consultardocumentos">
          <h2 className="consultarDocumentos">Consultar Documentos</h2>
          <h3 className="title-consultarDocumentos">Pesquisar Documentos:</h3>
          {error && <p className="error-message">{error}</p>}
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
              <input type="date" name="dataRecebimentoDe" required />
              até
              <input type="date" name="dataRecebimentoAte" required />
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
             <label>
              <span>Tipo de Documento:</span>
              <select
                onChange={handleTipoDocumentoChange}
                name="tipoDocumento"
                required 
              >
                <option value="">Selecione</option>
                <option value="99">Todos</option>
                <option value="1">NF-e</option>
                <option value="2">CT-e</option>
                <option value="3">CT-e OS</option>
                <option value="4">NFS-e</option>
                <option value="5">NF3e</option>
                <option value="6">Diversos</option>
              </select>
            </label>
            <button type="submit" className="button-primary-consultardocumentos">Pesquisar</button>
          </form>
        </div>
      )}
      {loading && (
        <div className="overlay">
          <div className="loading-container">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
          </div>
        </div>
      )}
      {showResults && (
        <PesquisaConsultarDocumentos documentData={documentData} />
      )}
    </div>
  );
}

export default ConsultarDocumentos;
