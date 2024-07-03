import React, { useState } from 'react';
import "./styleXmlRecebimento.css";

const XmlRecebimento = () => {
  const [formToShow, setFormToShow] = useState('Seleção');
  const [activeButton, setActiveButton] = useState('Seleção');
  const [classificationOption, setClassificationOption] = useState('');
  const [impressaoOption, setImpressaoOption] = useState('');
  const [opcaoSelecionada, setOpcaoSelecionada] = useState('');

  const showForm = (formName) => {
    setFormToShow(formName);
    setActiveButton(formName);
  };

  const handleClassificationChange = (event) => {
    setClassificationOption(event.target.value);
  };

  const handleImpressaoChange = (event) => {
    setImpressaoOption(event.target.value);
  };

  const handleChange = (event) => {
    const valorSelecionado = event.target.value;
    if (opcaoSelecionada === valorSelecionado) {
      setOpcaoSelecionada(''); // Desmarca a opção se já estiver selecionada
    } else {
      setOpcaoSelecionada(valorSelecionado);
    }
  };


  const renderForm = () => {
    switch (formToShow) {
      case 'Seleção':
        return (
          <form className="form-selection">
            <label>
              <span><p>Estabelecimento:</p>
                <input type="text" />
                até
                <input type="text" />
              </span>
            </label>
            <br />
            <label>
              <span><p>Data de Emissão:</p>
                <input type="date" />
                até
                <input type="date" />
              </span>
            </label>
            <br />
            <label>
              <span><p>Emitente:</p>
                <input type="text" readOnly />
                até
                <input type="text" readOnly />
              </span>
            </label>
            <br />
            <label>
              <span><p>Data de Transação:</p>
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
          <form className="form-parameters">
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
      case 'Impressão':
        return (
          <form className="form-printing">
            <div className='section-printing'>
            <h2>Destino</h2>
            <label>
              <input
                type="radio"
                value="Impressora"
                checked={impressaoOption === 'Impressora'}
                onChange={handleImpressaoChange}
              />
              <span> Impressora </span>
            </label>
            <label>
              <input
                type="radio"
                value="Arquivo"
                checked={impressaoOption === 'Arquivo'}
                onChange={handleImpressaoChange}
              /> 
             <span> Arquivo </span>
            </label>
            <label>
              <input
                type="radio"
                value="Terminal"
                checked={impressaoOption === 'Terminal'}
                onChange={handleImpressaoChange}
              /> 
             <span> Terminal </span>
            </label>
            </div>
            <div>
            <h2>Execução</h2>
            <label>
              <input
                type="radio"
                value="OnLine"
                checked={impressaoOption === 'OnLine'}
                onChange={handleImpressaoChange}
              />
              <span> Impressora </span>
            </label>
            <label>
              <input
                type="radio"
                value="Batch"
                checked={impressaoOption === 'Batch'}
                onChange={handleImpressaoChange}
              /> 
             <span> Batch </span>
            </label>
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

export default XmlRecebimento;
