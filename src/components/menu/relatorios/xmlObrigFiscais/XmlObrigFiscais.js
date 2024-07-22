import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import "./styleXmlObrigFiscais.css";

const XmlObrigFiscais = () => {
  const [formToShow, setFormToShow] = useState('Seleção');
  const [activeButton, setActiveButton] = useState('Seleção');
  const [classificationOption, setClassificationOption] = useState('');
  const [opcaoSelecionada, setOpcaoSelecionada] = useState('');

  const showForm = (formName) => {
    setFormToShow(formName);
    setActiveButton(formName);
  };

  const handleClassificationChange = (event) => {
    setClassificationOption(event.target.value);
  };

  const handleChange = (event) => {
    const valorSelecionado = event.target.value;
    if (opcaoSelecionada === valorSelecionado) {
      setOpcaoSelecionada('');
    } else {
      setOpcaoSelecionada(valorSelecionado);
    }
  };

  const handleExport = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'DataExport.xlsx');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = [];

    switch (formToShow) {
      case 'Seleção':
        data = [
          { 'Estabelecimento': 'Example 1', 'Data de Emissão': '2024-01-01', 'Emitente': 'Example Emitente 1', 'Data de Transação': '2024-01-02' },
          // Adicione mais dados conforme necessário
        ];
        break;
      case 'Classificação':
        data = [
          { 'Classificação': classificationOption },
          // Adicione mais dados conforme necessário
        ];
        break;
      case 'Parâmetros':
        data = [
          { 'Tipo de Comparação': 'Example Comparação', 'Tipo de Nota': 'Example Nota', 'Tipo de Relatório': opcaoSelecionada },
          // Adicione mais dados conforme necessário
        ];
        break;
      default:
        data = [];
    }

    handleExport(data);
  };

  const renderForm = () => {
    switch (formToShow) {
      case 'Seleção':
        return (
          <form className="form-selection" onSubmit={handleSubmit}>
            <label>
              <span><p>Estabelecimento:</p>
                <input type="text" />
                -
                <input type="text" />
              </span>
            </label>
            <br />
            <label>
              <span><p>Data de Emissão:</p>
                <input type="date" />
                -
                <input type="date" />
              </span>
            </label>
            <br />
            <label>
              <span><p>Emitente:</p>
                <input type="text" readOnly />
                -
                <input type="text" readOnly />
              </span>
            </label>
            <br />
            <label>
              <span><p>Data de Transação:</p>
                <input type="date" />
                -
                <input type="date" />
              </span>
            </label>
            <button className="submit-executar-fiscais" type="submit">Executar</button>
            <button className="button-executar-fiscais" type="button">Cancelar</button>
          </form>
        );
      case 'Classificação':
        return (
          <form className="form-classification" onSubmit={handleSubmit}>
            <label>
              <input
                type="radio"
                value="PorDataFornecNroDocto"
                checked={classificationOption === 'PorDataFornecNroDocto'}
                onChange={handleClassificationChange}
              />
              <span>Por data / Fornec / Nro. Docto</span>
            </label>
            <label>
              <input
                type="radio"
                value="PorFornecNroDocto"
                checked={classificationOption === 'PorFornecNroDocto'}
                onChange={handleClassificationChange}
              />
             <span> Por Fornec / Nro. Docto</span>
            </label>
            <button className="submit-executar-fiscais" type="submit">Executar</button>
            <button className="button-executar-fiscais" type="button">Cancelar</button>
          </form>
        );
      case 'Parâmetros':
        return (
          <form className="form-parameters" onSubmit={handleSubmit}>
            <h2 className='title-group-comparacao'>Tipo de Comparação</h2>
            <div className='section-comparacao'>
              <label>
                <input type="checkbox" name="docNaoEncontrado" />
                Documento não encontrado
              </label>
              <label>
                <input type="checkbox" name="chaveNFe" />
                Chave NF-e
              </label>
              <label>
                <input type="checkbox" name="naturezaOperacao" />
                Natureza Operação
              </label>
              <label>
                <input type="checkbox" name="dataEmissao" />
                Data Emissão
              </label>
              <label>
                <input type="checkbox" name="valorTotal" />
                Valor Total
              </label>
              <div className='section-group-notas'>
              <h2 className='title-group-notas'>Tipo de Nota</h2>
              <label for="tipoNota">Tipo:</label>
                <select id="tipoNota" name="tipoNota">
                  <option value="Todos">Todos</option>
                  <option value="Entrada">Entrada</option>
                  <option value="Serviço">Serviço</option>
                </select>
              </div>
              </div>
              <div className='form-group-relatorio'>
              <h2 className='title-group-relatorio'> Tipo Relatório</h2>
              <div className='section-relatorio'>
              <label>
              <input
                type="radio"
                value="problema"
                checked={opcaoSelecionada === 'problema'}
                onChange={handleChange}
              />
             <span> Somente documentos com problema</span>
            </label>
            <label>
              <input
                type="radio"
                value="todos"
                checked={opcaoSelecionada === 'todos'}
                onChange={handleChange}
              />
             <span> Todos documentos</span>
            </label>
            </div>
            </div>
            <div>
            <h2 className='title-group-considera'>Tipo de Comparação</h2>
            <div className='section-considera'>
              <label>
                <input type="checkbox" name="considera" />
                Não Considera Série para documentos anteriores à:
                <p><input type='text'/></p>
              </label>
              </div>
              <div className='section-imprimexcel'>
              <label>
                <input type="checkbox" name="imprimeExcel" />
                Imprime Excel
              </label>
              </div>
            </div>
            <button className="submit-executar-fiscais" type="submit">Executar</button>
            <button className="button-executar-fiscais" type="button">Cancelar</button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container-xmlobrigfiscais">
      <div className="button-group">
        <button
          className={`button-secondary ${activeButton === 'Seleção' ? 'active' : ''}`}
          onClick={() => showForm('Seleção')}
        >
          Seleção
        </button>
        <button
          className={`button-secondary ${activeButton === 'Classificação' ? 'active' : ''}`}
          onClick={() => showForm('Classificação')}
        >
          Classificação
        </button>
        <button
          className={`button-secondary ${activeButton === 'Parâmetros' ? 'active' : ''}`}
          onClick={() => showForm('Parâmetros')}
        >
          Parâmetros
        </button>
      </div>

      {/* Renderiza o formulário selecionado */}
      {renderForm()}
    </div>
  );
};

export default XmlObrigFiscais;
