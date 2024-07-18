import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';  // Import useHistory
import "./styleDetalhesConsultarDocumentos.css";
import { getStatusInfo, getTipoDocumentoInfo } from '../../../utils';

function DetalhesConsultarDocumentos() {
  const location = useLocation();
  const navigate = useNavigate();  // Initialize useHistory
  const { cId } = location.state || {};

  const [documento, setDocumento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState({
    itens: false,
  });

  const [activeButton, setActiveButton] = useState('');
  const [itensDocumento, setItensDocumento] = useState([]);

  useEffect(() => {
    if (!cId) return;
    
    const fetchDocumentoDetails = async () => {
      const base64Credentials = sessionStorage.getItem("token");

      try {
        const response = await fetch(`http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/piGetDocumXML/byId/${cId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64Credentials}`
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar detalhes do documento');
        }

        const data = await response.json();
        console.log("Dados recebidos:", data);

        if (data && data.items && data.items.length > 0) {
          setDocumento(data.items[0]);
        } else {
          setDocumento(null);
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do documento:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchItensDocumento = async () => {
      if (!cId) return;
    
      const base64Credentials = sessionStorage.getItem("token");
    
      try {
        const response = await fetch(`http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/piGetItemDocXML/byiddoc/${cId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64Credentials}`
          }
        });
    
        if (!response.ok) {
          throw new Error('Erro ao buscar itens do documento');
        }
    
        const data = await response.json();
        console.log("Itens recebidos:", data);
    
        if (data && data.items && data.items.length > 0) {
          setItensDocumento(data.items);
        } else {
          setItensDocumento([]);
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do documento:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentoDetails();
    fetchItensDocumento();
  }, [cId]);
    

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1); 
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  };

  const formatKey = (key) => {
    if (!key) return '';
    return `${key.slice(0, 2)}.${key.slice(2, 6)}.${key.slice(6, 8)}.${key.slice(8, 11)}.${key.slice(11, 14)}/${key.slice(14, 18)}-${key.slice(18, 20)}-${key.slice(20, 22)}-${key.slice(22, 25)}.${key.slice(25, 34)}-${key.slice(34, 43)}-${key.slice(43, 45)}`;
  };

  const toggleSection = (section) => {
    setSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section]
    }));
  };

  const handleButtonClick = (button) => {
    setActiveButton(prevButton => (prevButton === button ? '' : button));
  };

  const handleGoBack = () => {
    navigate(-1);  
  };

  if (loading || documento === null) {
    return (
      <div className="overlay-dc">
        <div className="loading-container-dc">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(documento.situacao);
  const tipoDocumentoInfo = getTipoDocumentoInfo(documento.tipo_doc);
  return (
    <div className="body-detailsdoc">
      <div className={`container-detailsdoc ${loading ? 'blur' : ''}`}>
        <button className="back-button" onClick={handleGoBack}>VOLTAR</button>
        <div className="selected-documento-details">
          <h1 className="title-detailsdoc">Detalhes do Documento</h1>
          <div className="document-info-dcd">
            <div className="document-title-dcd">
              <p> {documento.nro_docto}</p>
            </div>
            <div className="document-details-dcd">
              <div className="left-section-dcd">
                <div className="status-container">
                  <div className="status-description-pcd" style={{ backgroundColor: statusInfo.color }}>
                    {statusInfo.text}
                  </div>
                  <div className="tipo-container">
                    <div className="tipo-description-pcd" style={{ backgroundColor: tipoDocumentoInfo.color }}>
                      {tipoDocumentoInfo.text}
                    </div>
                  </div>
                </div>
                <p className="title-forneced-pcd">{documento.forneced}</p>
              </div>
              
              <div className="center-section-dcd">
                <div className="documento-serie-natureza-pcd">
                  <p><strong>Série:</strong> {documento.serie_docto}</p>
                  <p><strong>Natureza da Operação:</strong> {documento.nat_operacao}</p>
                </div>
              </div>
              
              <div className="right-section-dcd">
                <div className="documento-data-pcd">
                  <p><strong>Data de Emissão:</strong> {formatDate(documento.emissao)}</p>
                </div>
              </div>
            </div>
            </div>
          <div className="section-detailsdoc" onClick={() => toggleSection('detalhes')}>
            <h2>Detalhes <FontAwesomeIcon icon={sections.detalhes ? faChevronDown : faChevronRight} /></h2>
            <div className={`section-content-detailsdoc ${sections.detalhes ? 'show' : ''}`}>
              <p><strong>Fornecedor:</strong> {documento.forneced}</p>
              <p><strong>Série:</strong> {documento.serie_docto} {documento.arquivo_atualizado && "Arquivo Atualizado no EMS"}</p>
              <p><strong>Natureza da Operação:</strong> {documento.nat_operacao}</p>
              <p><strong>Observação:</strong> {documento.cod_observa}</p>
              <p><strong>Estabelecimento:</strong> {documento.estabel}</p>
              <p><strong>Data da Transação:</strong> {documento.dt_trans}<span><strong> Usuário Atualiza:</strong> {documento.usuario_atualiza}</span>
              <span><strong>Tipo de Documento:</strong> {documento.tipo_doc}</span></p>
              <p><strong>Data de Importação:</strong> {documento.dt_importa}<span><strong> Usuário de Importação:</strong> {documento.cod_usuario_importa}</span>
              <span><strong>Data de Emissão:</strong> {documento.emissao}</span></p>
              <p><strong>Chave do Documento:</strong> {formatKey(documento.chave_documento)}
              <span><strong>Protocolo:</strong> {documento.protocolo}</span></p>
              <p><strong>Situação do Manifesto:</strong> {documento.situacao_manifesto}</p>
              <p><strong>Protocolo Cancelamento:</strong> {documento.protocolo_cancel}
              <span><strong>Usuário Cancelamento:</strong> {documento.cod_usuario_cancel}
              <span><strong>Data de Cancelamento:</strong> {documento.dt_cancel_doc}</span></span></p>
            </div>
          </div>

          <div className="section-detailsdoc" onClick={() => toggleSection('valores')}>
            <h2>Valores <FontAwesomeIcon icon={sections.valores ? faChevronDown : faChevronRight} /></h2>
            <div className={`section-content-detailsdoc ${sections.valores ? 'show' : ''}`}>
              <p><strong>Valor Frete:</strong> {documento["valor-frete"]}
              <span><strong>Peso Total:</strong> {documento["tot-peso"]}</span></p>
              <p><strong>Seguro:</strong> {documento["valor-seguro"]}
              <span><strong>Total Desconto:</strong> {documento["tot-desconto"]}</span></p>
              <p><strong>Outras:</strong> {documento["valor-outras"]}
              <span><strong>Valor Tot Merc:</strong> {documento["valor-mercad"]}</span></p>
              <p><strong>Base Cálculo ICMS:</strong> {documento["base-icm"]}
              <span><strong>Valor ICMS:</strong> {documento["valor-icms"]}</span></p>
              <p><strong>Valor IPI:</strong> {documento["valor-ipi"]}
              <span><strong>Valor ISS:</strong> {documento["valor-iss"]}</span></p>
              <p><strong>Base Subs. Trib:</strong> {documento["base-subs"]}
              <span><strong>Valor Subst Trib:</strong> {documento["vl-subs"]}</span></p>
              <p><strong>Valor Total Nota:</strong> {documento["tot-valor"]}</p>
              <p><strong>Peso Bruto:</strong> {documento["peso-bru"]}
              <span><strong>Quantidade:</strong> {documento["qt-volume"]}</span></p>
              <p><strong>Peso Liq:</strong> {documento["peso-liq"]}
              <span><strong>Volume:</strong> {documento["Volume"]}</span></p>
            </div>
          </div>

          <div className="section-detailsdoc" onClick={() => toggleSection('valoresb')}>
            <h2>Valores || <FontAwesomeIcon icon={sections.valoresb ? faChevronDown : faChevronRight} /></h2>
            <div className={`section-content-detailsdoc ${sections.valoresb ? 'show' : ''}`}>
              <p><strong>PIS Retido:</strong> {documento["vl-pis-ret"]}
              <span><strong>COFINS Retido:</strong> {documento["vl-cofins-ret"]}
              <span><strong>CSLL Retido:</strong> {documento["vl-csll-ret"]}</span></span></p>
              <p><strong>Base IRRF:</strong> {documento["vl-base-irrf"]}
              <span><strong>Valor INSS:</strong> {documento["vl-inss"]}
              <span><strong>Valor IRRF:</strong> {documento["vl-irrf"]}</span></span></p>
              <p><strong>Base Ret Prev Soc:</strong> {documento["vl-base-ret-prev"]}
              <span><strong>Vl Ret Prev Soc:</strong> {documento["vl-ret-prev"]}
              <span><strong>Base ISSQN:</strong> {documento["vl-base-issqn"]}</span></span></p>
              <p><strong>Valor CSLL:</strong> {documento["vl-csll"]}
              <span><strong>Valor COFINS:</strong> {documento["vl-cofins"]}
              <span><strong>Valor COFINS Efetivo:</strong> {documento["vl-cofins-efet"]}</span></span></p>
              <p><strong>Valor PIS:</strong> {documento["vl-pis"]}
              <span><strong>Valor PIS Efetivo:</strong> {documento["vl-pis-efet"]}</span></p>
              <div className='quadrante-ec'>
                <h5>EC 87</h5>
                <p><strong>Valor Aprox Trib:</strong> {documento["vl-aprox-trib"]}</p>
                <p><strong>Valor ICMS Deson:</strong> {documento["vl-icms-deson"]}</p>
                <p><strong>Valor ICMS FCP Dest:</strong> {documento["vl-fcp-uf-dest"]}</p>
                <p><strong>Valor ICMS UF Dest:</strong> {documento["vl-icms-uf-dest"]}</p>
                <p><strong>Valor ICMS UF Rem:</strong> {documento["vl-icms-uf-rem"]}</p>
              </div>
            </div>
          </div>

          <div className="section-detailsdoc" onClick={() => toggleSection('observacao')}>
            <h2>Observação <FontAwesomeIcon icon={sections.observacao ? faChevronDown : faChevronRight} /></h2>
            <div className={`section-content-detailsdoc ${sections.observacao ? 'show' : ''}`}>
              <p> {documento["inf-complement"]}</p>
            </div>
          </div>

          <div className="section-detailsdoc" onClick={() => toggleSection('transp')}>
            <h2>Transp <FontAwesomeIcon icon={sections.transp ? faChevronDown : faChevronRight} /></h2>
            <div className={`section-content-detailsdoc ${sections.transp ? 'show' : ''}`}>
              <p><strong>Nome Abrev Transp:</strong> {documento["nome-transp"]}</p>
              <p><strong>Placa 1:</strong> {documento[""]}
              <span><strong>UF 1:</strong> {documento["uf"]}</span></p>
              <p><strong>Placa 2:</strong> {documento[""]}
              <span><strong>UF 2:</strong> {documento[""]}</span></p>
              <p><strong>Placa 3:</strong> {documento[""]}
              <span><strong>UF 3:</strong> {documento[""]}</span></p>
              <p><strong>Via Transporte:</strong> {documento[""]}</p>
              <p><strong>Modalid. Frete:</strong> {documento["mod-frete"]}</p>
              <p><strong>Tipo CT-e:</strong> {documento[""]}</p>
              <p><strong>UF Orig/Dest(GIA-SP):</strong> {documento["uf-dest"]}</p>
              <p><strong>Cód IBGE Munic Orig:</strong> {documento["municipio-entrega"]}</p>
              <p><strong>Cód IBGE Munic Dest:</strong> {documento["municipio-retirada"]}</p>
            </div>
          </div>

          <div className="section-detailsdoc" onClick={() => toggleSection('nfe')}>
            <h2>NF3e <FontAwesomeIcon icon={sections.nfe ? faChevronDown : faChevronRight} /></h2>
            <div className={`section-content-detailsdoc ${sections.nfe ? 'show' : ''}`}> 
              <p><strong>Consumo Energ Elét/Gás/Água Canaliz:</strong> {documento[""]}</p>
              <p><strong>Valor Total Fornecido/Consumido:</strong> {documento[""]}</p>
              <p><strong>Serviços Não-tributados Pelo ICMS:</strong> {documento["icm-nao-trib"]}</p>
              <p><strong>Vl Total Cobrado Nome de Terceiros:</strong> {documento[""]}</p>
              <p><strong>Tipo Ligação:</strong> {documento[""]}</p>
              <p><strong>Grupo Tensão:</strong> {documento[""]}</p>
              <p><strong>Indicador Destinatário/Acessante:</strong> {documento[""]}</p>
              <p><strong>Energia Injetada:</strong> {documento[""]}</p>
              <p><strong>Outras Deduções:</strong> {documento[""]}</p>
            </div>
          </div>

          <div className="button-bar">
            <button
              className={activeButton === 'itens' ? 'active' : ''}
              onClick={() => handleButtonClick('itens')}
            >
              Itens
            </button>
          </div>

          {itensDocumento.length > 0 && (
            <div className={`content-section ${activeButton === 'itens' ? 'show' : ''}`}>
              <div className="table-responsive-container">
                <table className="document-itens-table">
                  <thead>
                    <tr>
                      <th>Seg</th>
                      <th>Nat Fiscal</th>
                      <th>CFOP Fornec</th>
                      <th>Item Documento</th>
                      <th>Descrição</th>
                      <th>Item EMS</th>
                      <th>Descrição</th>
                      <th>Qtde</th>
                      <th>Un</th>
                      <th>Qtde Convert</th>
                      <th>VL Unit</th>
                      <th>VL Total</th>
                      <th>OC</th>
                      <th>Cod.Sit.ICMS(CST)</th>
                      <th>CST IPI</th>
                      <th>CST PIS</th>
                      <th>CST CONFINS</th>
                      <th>NCM</th>
                      <th>%IPI</th>
                      <th>EAN Fornec.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itensDocumento.map((item, index) => (
                      <tr key={index}>
                        {/* Preencha com os dados específicos de cada item */}
                        <td>{item.seq}</td>
                        <td>{item.CFOP_fornec}</td>
                        <td>{item.cfop_fornec}</td>
                        <td>{item.item_totvs}</td>
                        <td>{item.descr_it_fornec}</td>
                        <td>{item.item_ems}</td>
                        <td>{item.descr_it_fornec}</td>
                        <td>{item.qtde_fornec}</td>
                        <td>{item.un_totvs}</td>
                        <td>{item.qtde_convert}</td>
                        <td>{item.preco_unit}</td>
                        <td>{item.preco_total}</td>
                        <td>{item.OC}</td>
                        <td>{item.cst_icms}</td>
                        <td>{item.cst_ipi}</td>
                        <td>{item.cst_pis}</td>
                        <td>{item.cst_confins}</td>
                        <td>{item.ncm}</td>
                        <td>{item.aliq_ipi}</td>
                        <td>{item.ean_fornec}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default DetalhesConsultarDocumentos;
