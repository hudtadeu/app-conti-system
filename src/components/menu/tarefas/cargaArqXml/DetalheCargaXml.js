import React from 'react';
import './styleDetalheCargaXml.css';

function DetalheCargaXml() {
  return (
    <div className="body-cargaxml">
      <div className="container-cargaxml">
        <h1 className="title-cargaxml">Detalhe Carga Xml</h1>
        <div className="document-info-cargaxml">
          <div className="row-cargaxml-one">
            <div className="col-cargaxml-one">
              <label>Estab:</label>
              <input type="text" value="10" readOnly />
            </div>
            <div className="col-cargaxml-one">
              <label>Fornecedor:</label>
              <input type="text" value="3349" readOnly />
            </div>
            <div className="col-cargaxml-large">
              <input type="text" value="DITO TRANSPORTES" className='large-input-carga' readOnly />
            </div>
          </div>
          <div className="row-cargaxml">
            <div className="col-cargaxml">
              <label>Série:</label>
              <input type="text" value="1" className="cargaxml-serie" readOnly />
            </div>
            <div className="col-cargaxml">
              <label>CNPJ:</label>
              <input type="text" value="36503553000104" readOnly />
            </div>
            <div className="col-cargaxml">
              <label>UF:</label>
              <input type="text" value="SP" className="cargaxml-uf" readOnly />
            </div>
            <div className="col-cargaxml">
              <label>Inscr.Est:</label>
              <input type="text" value="798340637119" readOnly />
            </div>
          </div>
          <div className="row-cargaxml">
            <div className="col-cargaxml">
              <label>Nro Docto:</label>
              <input type="text" value="0006308" readOnly />
            </div>
            <div className="col-cargaxml">
              <label>Data Transação:</label>
              <input type="date" value="30/08/2024" readOnly />
            </div>
            <div className="col-cargaxml">
              <label>Finalidade:</label>
              <select disabled>
                <option value="N/A">N/A</option>
              </select>
            </div>
            <div className="col-cargaxml">
              <label>Data Emissão:</label>
              <input type="text" value="17/07/2024" readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalheCargaXml;
