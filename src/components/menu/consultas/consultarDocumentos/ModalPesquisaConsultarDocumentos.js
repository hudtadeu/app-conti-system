import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';

function ModalPesquisaConsultarDocumentos({ onSubmit, closeModal }) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const modalRef = useRef(null);

  const codEstabelFimRef = useRef(null);
  const documentoDeRef = useRef(null);
  const documentoAteRef = useRef(null);
  const fornecedorDeRef = useRef(null);
  const fornecedorAteRef = useRef(null);
  const dataRecebimentoDeRef = useRef(null);
  const dataRecebimentoAteRef = useRef(null);
  const serieDeRef = useRef(null);
  const serieAteRef = useRef(null);
  const chaveDocumentoDeRef = useRef(null);
  const chaveDocumentoAteRef = useRef(null);
  const tipoDocumentoRef = useRef(null);
  const submitButtonRef = useRef(null);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day.padStart(2, '0')}${month.padStart(2, '0')}${year}`;
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  const handleKeyDown = (event, nextFieldRef) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (nextFieldRef) {
        nextFieldRef.current.focus();
      } else {
        handleSubmit(event); 
      }
    }
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
        onSubmit(data.items); 
      } else {
        setError("Nenhum item encontrado na resposta.");
      }
    } catch (error) {
      setError("Erro ao buscar documentos.");
      console.error("Erro ao buscar documentos:", error);
    } finally {
      setLoading(false);
      closeModal(); 
    }
  };

  return (
    <div className="modal-overlay-carga" onClick={handleClickOutside}>
      <div className="modal-content-carga" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2 className="modal-title">Consultar Documento</h2>
        {error && <p className="error-message">{error}</p>}
        <form ref={formRef} className="modal-form-carga" onSubmit={handleSubmit}>
          <label>
            <span>Cod. Estabelecimento:</span>
            <div className="input-group-search">
              <input type="text" name="codEstabelIni" onKeyDown={(e) => handleKeyDown(e, codEstabelFimRef)} />
              -
              <input type="text" name="codEstabelFim" ref={codEstabelFimRef} onKeyDown={(e) => handleKeyDown(e, documentoDeRef)} />
            </div>
          </label>
          <br />
          <label>
            <span>Documento:</span>
            <div className="input-group-search">
              <input type="text" name="documentoDe" ref={documentoDeRef} onKeyDown={(e) => handleKeyDown(e, documentoAteRef)} />
              -
              <input type="text" name="documentoAte" ref={documentoAteRef} onKeyDown={(e) => handleKeyDown(e, fornecedorDeRef)} />
            </div>
          </label>
          <br />
          <label>
            <span>Fornecedor:</span>
            <div className="input-group-search">
              <input type="text" name="fornecedorDe" ref={fornecedorDeRef} onKeyDown={(e) => handleKeyDown(e, fornecedorAteRef)} />
              -
              <input type="text" name="fornecedorAte" ref={fornecedorAteRef} onKeyDown={(e) => handleKeyDown(e, dataRecebimentoDeRef)} />
            </div>
          </label>
          <br />
          <label>
            <span>Data de recebimento:</span>
            <div className="input-group-search">
              <input type="date" name="dataRecebimentoDe" ref={dataRecebimentoDeRef} onKeyDown={(e) => handleKeyDown(e, dataRecebimentoAteRef)} required />
              -
              <input type="date" name="dataRecebimentoAte" ref={dataRecebimentoAteRef} onKeyDown={(e) => handleKeyDown(e, serieDeRef)} required />
            </div>
          </label>
          <br />
          <label>
            <span>Série Documento:</span>
            <div className="input-group-search">
              <input type="text" name="serieDe" ref={serieDeRef} onKeyDown={(e) => handleKeyDown(e, serieAteRef)} />
              -
              <input type="text" name="serieAte" ref={serieAteRef} onKeyDown={(e) => handleKeyDown(e, chaveDocumentoDeRef)} />
            </div>
          </label>
          <br />
          <label>
            <span>Chave Documento:</span>
            <div className="input-group-search">
              <input type="text" name="chaveDocumentoDe" ref={chaveDocumentoDeRef} onKeyDown={(e) => handleKeyDown(e, chaveDocumentoAteRef)} />
              -
              <input type="text" name="chaveDocumentoAte" ref={chaveDocumentoAteRef} onKeyDown={(e) => handleKeyDown(e, tipoDocumentoRef)} />
            </div>
          </label>
          <br />
          <label>
            <span>Tipo de Documento:</span>
            <select
              onChange={() => setError('')}
              name="tipoDocumento"
              ref={tipoDocumentoRef}
              onKeyDown={(e) => handleKeyDown(e, submitButtonRef)}
              required 
            >
              <option value="">Selecione</option>
              <option value="99">Todos</option>
              <option value="1">NF-e</option>
              <option value="2">CT-e</option>
              <option value="3">CT-e OS</option>
              <option value="4">NFS-e</option>
              <option value="5">NF3e</option>
            </select>
          </label>
          <br />
          <button type="submit" className="button-primary-consultardocumentos" ref={submitButtonRef}>Pesquisar</button>
        </form>
        {loading && (
        <div className="overlay-carga">
          <div className="loading-container-carga">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default ModalPesquisaConsultarDocumentos;
