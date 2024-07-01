import React, { useState } from 'react';
import "./styleXmlObrigFiscais.css";

const XmlObrigFiscais = () => {
  const [formToShow, setFormToShow] = useState('Seleção');
  const [activeButton, setActiveButton] = useState('Seleção');

  const showForm = (formName) => {
    setFormToShow(formName);
    setActiveButton(formName);
  };

  const renderForm = () => {
    switch (formToShow) {
      case 'Seleção':
        return (
          <form className="form-selection">
            <label>
              <span>Estabelecimento:
                <input type="text" />
                até
                <input type="text" />
              </span>
            </label>
            <br />
            <label>
              <span>Data de Emissão:
                <input type="date" />
                até
                <input type="date" />
              </span>
            </label>
            <br />
            <label>
              <span>Emitente:
                <input type="text" readOnly />
                até
                <input type="text" readOnly />
              </span>
            </label>
            <br />
            <label>
              <span>Data de Transação:
                <input type="date" />
                até
                <input type="date" />
              </span>
            </label>
            <button className="submit-executar-fiscais" type="submit">Executar</button>
            <button className="button-executar-fiscais" type="button">Cancelar</button>
          </form>
        );
      case 'Classificação':
        return (
          <form className="form-classification">
            {/* Conteúdo do formulário de Classificação */}
          </form>
        );
      case 'Parâmetros':
        return (
          <form className="form-parameters">
            {/* Conteúdo do formulário de Parâmetros */}
          </form>
        );
      case 'Impressão':
        return (
          <form className="form-printing">
            {/* Conteúdo do formulário de Impressão */}
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container-empresa">
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
        <button
          className={`button-secondary ${activeButton === 'Impressão' ? 'active' : ''}`}
          onClick={() => showForm('Impressão')}
        >
          Impressão
        </button>
      </div>

      {/* Renderiza o formulário selecionado */}
      {renderForm()}
    </div>
  );
};

export default XmlObrigFiscais;
