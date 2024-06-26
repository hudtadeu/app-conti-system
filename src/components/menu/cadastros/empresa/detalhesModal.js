import React, { useState } from "react";
import Modal from "./modalEmpresa";
import "./styleDetalhesModal.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile, faUndoAlt, faMapMarkerAlt, faBox, faCalendarAlt, faWarehouse,
faPaperclip, faServer, faFileInvoice, faLock, faNetworkWired, faTag, faUser, faGlobe, faCertificate} from '@fortawesome/free-solid-svg-icons';

const DetalhesModal = ({ isOpen, empresa, onClose }) => {
  const [tab, setTab] = useState("geral");

  const changeTab = (newTab) => {
    setTab(newTab);
  };

  const getCheckboxHTML = (condition) => {
    return <input type="checkbox" checked={condition} disabled />;
  };

const tipoCertificado = empresa && empresa["tipo-certificado"];
const tipoCertificadoTexto = tipoCertificado === 1 ? "A1" : tipoCertificado === 2 ? "A2" : "Não encontrado.";

const cdArmazena = empresa && empresa["cd-armazena"];
const cdArmazenaTexto = cdArmazena === 1 ? "Não Armazena" :
                        cdArmazena === 2 ? "Armazena em Pasta Física" :
                        cdArmazena === 3 ? "Armazena em Banco de Dados" :
                        "Não encontrado.";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {empresa ? (
        <div className="modal-content-fixed">
          <h2 className="title-details">Detalhes da Empresa</h2>
          <div className="container-datails">
            <div>
              <strong>Código:</strong><span> {empresa["cod-estabel"]}</span>
            </div>
            <div>
              <strong>Nome:</strong><span> {empresa["nome"]}</span>
            </div>
            <div>
              <strong>Razão Social:</strong><span> {empresa["razao-social"]}</span>
            </div>
          </div>
          <div className="btn-group">
            <button
              id="geralButton"
              onClick={() => changeTab("geral")}
              className={tab === "geral" ? "active" : ""}
            >
              Geral
            </button>
            <button
              id="traducaoButton"
              onClick={() => changeTab("traducao")}
              className={tab === "traducao" ? "active" : ""}
            >
              Tradução
            </button>
            <button
              id="traducaoButtonB"
              onClick={() => changeTab("traducaoB")}
              className={tab === "traducaoB" ? "active" : ""}
            >
              Tradução ||
            </button>
            <button
              id="configuracoesButton"
              onClick={() => changeTab("configuracoes")}
              className={tab === "configuracoes" ? "active" : ""}
            >
              Configurações
            </button>
            <button
              id="servidorButton"
              onClick={() => changeTab("servidor")}
              className={tab === "servidor" ? "active" : ""}
            >
              Servidor RPW
            </button>
          </div>

          <div className="tab-content">
            {tab === "geral" && (
              <div className="quadrante-details">
                <div>
                  <strong>Pasta de Entrada:</strong>
                  <div className="input-icon-wrapper">
                  <FontAwesomeIcon icon={faFolder} className="input-wrapper-details"/>
                  <input className="input-detailsmodal" type="text" value={empresa["pasta-entrada"]} readOnly />
                  </div> 
                </div>
                <div>
                  <strong>Pasta Processo Email:</strong>{" "}
                  <div className="input-icon-wrapper">
                  <FontAwesomeIcon icon={faFolder} className="input-wrapper-details"/>
                  <input className="input-detailsmodal" type="text" value={empresa["pasta-proc-mail"]} readOnly />
                  </div>
                </div>
                <div>
                  <strong>Pasta Processo DFE:</strong>{" "}
                  <div className="input-icon-wrapper">
                  <FontAwesomeIcon icon={faFolder} className="input-wrapper-details"/>
                  <input className="input-detailsmodal" type="text" value={empresa["pasta-proc-dfe"]} readOnly />
                  </div>
                </div>
                <div>
                  <strong>Pasta de Erros:</strong>
                  <div className="input-icon-wrapper">
                  <FontAwesomeIcon icon={faFolder} className="input-wrapper-details"/>
                  <input className="input-detailsmodal" type="text" value= {empresa["pasta-erros"]} readOnly />
                  </div>
                </div>
                <div>
                  <strong>Armazenagem do XML:</strong>
                  <div className="input-icon-wrapper">
                  <FontAwesomeIcon icon={faWarehouse} className="input-wrapper-details"/>
                  <input className="input-detailsmodal" type="text" value= {cdArmazenaTexto} readOnly />
                  </div>
                  <div id="infoArmazena">
                    <li>
                      Habilita Pasta Log:{" "}
                      {getCheckboxHTML(empresa["l-pasta-log"])}
                    </li>
                  </div>
                </div>
                <div>
                  <strong>Pasta de Armazenagem:</strong>{" "}
                  <div className="input-icon-wrapper">
                  <FontAwesomeIcon icon={faFolder} className="input-wrapper-details"/>
                  <input className="input-detailsmodal" type="text" value= {empresa["pasta-armaz"]} readOnly />
                  </div>
                </div>
                <div>
                  <strong>Pasta de Gravação do Log:</strong>{" "}
                  <div className="input-icon-wrapper">
                  <FontAwesomeIcon icon={faFolder} className="input-wrapper-details"/>
                  <input className="input-detailsmodal" type="text" value= {empresa["pasta-grava-log"]} readOnly />
                  </div>
                </div>
              </div>
            )}

            {tab === "traducao" && (
              <div className="quadrante-traducao">
                <div>
                  <strong>Utiliza Item Cliente/Fornecedor:</strong>{" "}
                  {getCheckboxHTML(empresa["l-item-fornec"])}
                </div>
                <div>
                  <strong>Utiliza FIFO Ordem de Compra:</strong>{" "}
                  {getCheckboxHTML(empresa["l-fifo-ordem-compra"])}
                </div>
                <div>
                  <strong>Importa Observação XML:</strong>{" "}
                  {getCheckboxHTML(empresa["l-observacao"])}
                </div>
                <div>
                  <strong>Envia E-mail Eventos:</strong>{" "}
                  {getCheckboxHTML(empresa["l-email-eventos"])}
                </div>
                <div>
                  <strong>Mantém Impostos do XML na Capa:</strong>{" "}
                  {getCheckboxHTML(empresa["l-impostos-capa"])}
                </div>
                <div>
                  <strong>Zera Valor IPI Outros:</strong>{" "}
                  {getCheckboxHTML(empresa["l-zera-ipi-outros"])}
                </div>
                <div>
                  <strong>Prioriza Documentos:</strong>{" "}
                  {getCheckboxHTML(empresa["l-prioriza-documento"])}
                </div>
                <div>
                  <strong>Informa Conta/CCusto Manual Item:</strong>{" "}
                  {getCheckboxHTML(empresa.lPriorizaDocumento)}
                </div>
                <div>
                  <strong>Usa Tag Ordem Compra:</strong>{" "}
                  {getCheckboxHTML(empresa["l-usa-tag-compra"])}
                </div>
                <div>
                  <strong>Usa Tag Ordem Compra:</strong>{" "}
                  {getCheckboxHTML(empresa["l-usa-tag-compra"])}
                </div>
                <div>
                  <strong>Usa NCM Fornecedor:</strong>{" "}
                  {getCheckboxHTML(empresa["log-ncm-fornec"])}
                </div>
                <div>
                  <strong>Altera NCM do item:</strong>{" "}
                  {getCheckboxHTML(empresa["log-altera-ncm"])}
                </div>
                <div>
                  <strong>Quantidade Manual:</strong>{" "}
                  {getCheckboxHTML(empresa["log-qt-manual"])}
                </div>
                <div>
                  <strong>Usa CST Fornecedor:</strong>{" "}
                  {getCheckboxHTML(empresa["log-cst-fornec"])}
                </div>
                <div>
                  <strong>Usa Duplicata Documento XML:</strong>{" "}
                  {getCheckboxHTML(empresa["l-duplic-docum"])}
                </div>
                <div>
                  <strong>Altera EAN/GTIN do item:</strong>{" "}
                  {getCheckboxHTML(empresa["log-altera-ean-gtin"])}
                </div>
                <div>
                  <strong>Grava Pesos Recebimento Físico:</strong>{" "}
                  {getCheckboxHTML(empresa["l-peso-doc-fisico"])}
                </div>
                <div>
                  <strong>Bloqueia Lançamento sem Confirmação:</strong>{" "}
                  {getCheckboxHTML(empresa.lPriorizaDocumento)}
                </div>
                <div>
                  <strong>Bloqueia UN Divergente:</strong>{" "}
                  {getCheckboxHTML(empresa["log-bloq-un-divergente"])}
                </div>
                <div>
                  <strong>Bloqueia OP Finaliz/Terminada:</strong>{" "}
                  {getCheckboxHTML(empresa["l-bloqueia-op-finaliz"])}
                </div>
                <div>
                  <strong>Bloqueia NCM Divergente:</strong>{" "}
                  {getCheckboxHTML(empresa["log-bloqueio-ncm-diverg"])}
                </div>
                <div>
                  <strong>Bloqueia Diverg Valor OC:</strong>{" "}
                  {getCheckboxHTML(empresa["l-bloq-var-valor"])}
                </div>
                <div>
                  <strong>Bloqueia Diverg Quantidade OC:</strong>{" "}
                  {getCheckboxHTML(empresa["l-bloq-var-quant"])}
                </div>
                <div>
                  <strong>Bloqueia Estab OC Divergente:</strong>{" "}
                  {getCheckboxHTML(empresa["l-bloq-estab-diveg"])}
                </div>
                <div>
                  <strong>Usa NCM Fornecedor Debito Direto:</strong>{" "}
                  {getCheckboxHTML(empresa["l-subst-ncm-dd"])}
                </div>
                <div>
                  <strong>Contingência Download XML:</strong>{" "}
                  {getCheckboxHTML(empresa.lPriorizaDocumento)}
                </div>
              </div>
            )}
            {tab === "traducaoB" && (
              <div className="quadrante-details">
                <div>
                  <strong>Devolução Nota Própria:</strong>{" "}
                  <div>
                    {getCheckboxHTML(empresa["log-depos-devol"])} Define
                    Depósito de Devolução
                  </div>
                </div>
                <div>
                  <strong>Depos Devolução:</strong>{" "}
                  <div className="input-icon-wrapper">
                  <FontAwesomeIcon icon={faUndoAlt} className="input-wrapper-details"/>
                  <input className="input-detailsmodal" type="text" value= {empresa["cod-depos-dev"] || "Não encontrado."} readOnly />
                  </div>
                </div>
                <div>
                  <strong>Localiz Devolução:</strong>{" "}
                  <div className="input-icon-wrapper">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="input-wrapper-details"/>
                  <input className="input-detailsmodal" type="text" value=  {empresa["cod-localiz-dev"] || "Não encontrado."} readOnly />
                  </div>
                </div>
                <div>
                  <strong>Informações Lote Automática:</strong>{" "}
                  {getCheckboxHTML(empresa["l-fixa-lote"])} Insere Lote Fixo
                </div>
                <div>
                  <strong>Lote Fixo:</strong>{" "}
                    <div className="input-icon-wrapper">
                      <FontAwesomeIcon icon={faBox} className="input-wrapper-details"/>
                      <input className="input-detailsmodal" type="text" value=  {empresa["lote"] || "Não encontrado."} readOnly />
                      </div>
                      <strong>Dt Validade:</strong>{" "}
                      <div className="input-icon-wrapper">
                      <FontAwesomeIcon icon={faCalendarAlt} className="input-wrapper-details"/>
                      <input className="input-detailsmodal" type="text" value=  {empresa["dt-valid-lote"] || "Não encontrado."} readOnly />
                  </div>
                </div>
                <div>
                  {getCheckboxHTML(empresa["l-copia-gfe"])} Copia CT-e para GFE
                </div>
                <div>
                  <strong>Pasta Cópia GFE:</strong>{" "}
                  <div className="input-icon-wrapper">
                      <FontAwesomeIcon icon={faFolder} className="input-wrapper-details"/>
                      <input className="input-detailsmodal" type="text" value=  {empresa["pasta-gfe"] || "Não encontrado."} readOnly />
                  </div>
                </div>
                <div>
                  <strong>Anexos Divergência:</strong>{" "}
                  <div className="input-icon-wrapper">
                      <FontAwesomeIcon icon={faPaperclip} className="input-wrapper-details"/>
                      <input className="input-detailsmodal" type="text" value=  {empresa["pasta-anexo-diverg"] || "Não encontrado."} readOnly />
                  </div>
                </div>
              </div>
            )}

            {tab === "configuracoes" && (
              <div className="quadrante-configuracoes">
                <div className="coluna">
                  <div>
                    <strong>Servidor E-mail:</strong>
                    <div className="input-icon-wrapper">
                      <FontAwesomeIcon icon={faServer} className="input-wrapper-details"/>
                      <input className="input-detailsmodal" type="text" value= {empresa["servidor-email"]} readOnly />
                  </div> 
                  </div>
                  <div>
                    <strong>E-mail NFe:</strong> 
                    <div className="input-icon-wrapper">
                      <FontAwesomeIcon icon={faFileInvoice} className="input-wrapper-details"/>
                      <input className="input-detailsmodal" type="text" value= {empresa["e-mail-nfe"]} readOnly />
                  </div> 
                  </div>
                  <div>
                    <strong>Senha E-mail:</strong>{" "}
                    <div className="input-icon-wrapper">
                      <FontAwesomeIcon icon={faLock} className="input-wrapper-details"/>
                      <input className="input-detailsmodal" type="text" value= {empresa["senha-email"] ? "********" : "Não definida."} readOnly />
                  </div> 
                  </div>
                  <div>
                    <strong>Tipo Conexão:</strong>{" "}
                    <div className="input-icon-wrapper">
                      <FontAwesomeIcon icon={faNetworkWired} className="input-wrapper-details"/>
                      <input className="input-detailsmodal" type="text" value= {empresa["tipo-conexao-mail"] === 1 ? "Segura" : "Não segura"} readOnly />
                  </div> 
                  </div>
                  <div>
                    <strong>Cliente ID:</strong>{" "}
                    <div className="input-icon-wrapper">
                      <FontAwesomeIcon icon={faTag} className="input-wrapper-details"/>
                      <input className="input-detailsmodal" type="text" value= {empresa["client-id"] || "Não encontrado."} readOnly />
                    </div>
                  </div>
                  <div>
                    <strong>Tenant ID:</strong>{" "}
                    <div className="input-icon-wrapper">
                      <FontAwesomeIcon icon={faTag} className="input-wrapper-details"/>
                      <input className="input-detailsmodal" type="text" value= {empresa["tenant-id"] || "Não encontrado."} readOnly />
                    </div>
                  </div>
                  <div>
                    <strong>Ambiente SEFAZ:</strong> 
                    <div className="input-icon-wrapper">
                      <FontAwesomeIcon icon={faGlobe} className="input-wrapper-details"/>
                      <input className="input-detailsmodal" type="text" value= {empresa["ambiente-sefaz"] || "Não encontrado."} readOnly />
                  </div>
                  </div>
                  <div>
                    <strong>Ambiente Destinada:</strong>{" "}
                    <div className="input-icon-wrapper">
                      <FontAwesomeIcon icon={faGlobe} className="input-wrapper-details"/>
                      <input className="input-detailsmodal" type="text" value= {empresa["ambiente-destinadas"] || "Não encontrado."} readOnly />
                  </div>
                  </div>
                  <div>
                    <strong>Tipo Certificado:</strong>
                    <div className="input-icon-wrapper">
                      <FontAwesomeIcon icon={faCertificate} className="input-wrapper-details"/>
                      <input
                        className="input-detailsmodal"
                        type="text"
                        value={tipoCertificadoTexto}
                        readOnly
                      />
                    </div>   
                  </div>
                  </div>
                <div className="coluna">
                  <div>
                    <strong>Senha Certificado:</strong>{" "}
                    <div className="input-icon-wrapper">
                      <FontAwesomeIcon icon={faLock} className="input-wrapper-details"/>
                      <input className="input-detailsmodal" type="text" value= {empresa["senha-certificado"] ? "********" : "Não definida."} readOnly />
                    </div> 
                  </div>
                  <div>
                    <strong>Arquivo Certificado:</strong>
                    <div className="input-icon-wrapper">
                      <FontAwesomeIcon icon={faFile} className="input-wrapper-details"/>
                      <input className="input-detailsmodal" type="text" value= {empresa[""] || "Não encontrado."} readOnly />
                    </div>   
                  </div>
                  <div>
                    <strong>Pasta Arq Configuração:</strong>{" "}
                    <div className="input-icon-wrapper">
                      <FontAwesomeIcon icon={faFile} className="input-wrapper-details"/>
                      <input className="input-detailsmodal" type="text" value= {empresa["pasta-arq-config"]} readOnly />
                    </div>   
                  </div>
                  <div>
                    <strong>Nome Arq Config:</strong>
                    <div className="input-icon-wrapper">
                      <FontAwesomeIcon icon={faFile} className="input-wrapper-details"/>
                      <input className="input-detailsmodal" type="text" value= {empresa["nome-arq-config"]} readOnly />
                    </div>
                  </div>
                  <div >
                    <strong>Utiliza Proxy:</strong>
                      {getCheckboxHTML(empresa && empresa["l-utiliza-proxy"])}{" "}
                  </div>
                  <div>
                    <strong>Servidor Proxy:</strong>{" "}
                    <div className="input-icon-wrapper">
                      <FontAwesomeIcon icon={faServer} className="input-wrapper-details"/>
                      <input className="input-detailsmodal" type="text" value= {empresa["servidor-proxy"] || "Não encontrado."} readOnly />
                    </div> 
                  </div>
                  <div>
                    <strong>Porta:</strong> {empresa["porta-proxy"]}
                  </div>
                  <div>
                    <strong>Usuário Proxy:</strong>{" "}
                    <div className="input-icon-wrapper">
                      <FontAwesomeIcon icon={faUser} className="input-wrapper-details"/>
                      <input className="input-detailsmodal" type="text" value= {empresa["usuario-proxy"] || "Não encontrado."} readOnly />
                    </div>   
                  </div>
                  <div>
                    <strong>Senha Proxy:</strong>{" "}
                    <div className="input-icon-wrapper">
                      <FontAwesomeIcon icon={faLock} className="input-wrapper-details"/>
                      <input className="input-detailsmodal" type="text" value= {empresa["senha-proxy"] ? "********" : "Não definida."} readOnly />
                    </div> 
                  </div>
                </div>
              </div>
            )}

            {tab === "servidor" && (
              <div className="quadrante-details">
                {" "}
                <div>
                  <strong>Usa Linux RPW:</strong>{" "}
                  {getCheckboxHTML(empresa["l-usa-linux-rpw"])}
                </div>
                <div>
                  <strong>Arquivo Certificado Linux:</strong>{" "}
                  <div className="input-icon-wrapper">
                  <FontAwesomeIcon icon={faFile} className="input-wrapper-details"/>
                  <input className="input-detailsmodal" type="text" value= {empresa["cod-arq-certificado-lnx"] || "Não disponível."} readOnly />
                  </div>
                </div>
                <div>
                  <strong>Nome Arquivo Configuração Linux:</strong>{" "}
                  <div className="input-icon-wrapper">
                  <FontAwesomeIcon icon={faFile} className="input-wrapper-details"/>
                  <input className="input-detailsmodal" type="text" value= {empresa["nome-arq-config-lnx"] || "Não disponível."} readOnly />
                  </div>
                </div>
                <div>
                  <strong>Pasta Arquivo Configuração Linux:</strong>{" "}
                  <div className="input-icon-wrapper">
                  <FontAwesomeIcon icon={faFolder} className="input-wrapper-details"/>
                  <input className="input-detailsmodal" type="text" value= {empresa["pasta-arq-config-lnx"] || "Não disponível."} readOnly />
                  </div>
                </div>
                <div>
                  <strong>Pasta de Entrada Linux:</strong>{" "}
                  <div className="input-icon-wrapper">
                  <FontAwesomeIcon icon={faFolder} className="input-wrapper-details"/>
                  <input className="input-detailsmodal" type="text" value= {empresa["pasta-entrada-lnx"] || "Não disponível."} readOnly />
                  </div>
                </div>
                <div>
                  <strong>Pasta Processo E-mail Linux:</strong>{" "}
                  <div className="input-icon-wrapper">
                  <FontAwesomeIcon icon={faFolder} className="input-wrapper-details"/>
                  <input className="input-detailsmodal" type="text" value= {empresa["pasta-proc-mail-lnx"] || "Não disponível."} readOnly />
                  </div>
                </div>
                <div>
                  <strong>Pasta Processo DFE Linux:</strong>{" "}
                  <div className="input-icon-wrapper">
                  <FontAwesomeIcon icon={faFolder} className="input-wrapper-details"/>
                  <input className="input-detailsmodal" type="text" value= {empresa["pasta-proc-dfe-lnx"] || "Não disponível."} readOnly />
                  </div>
                </div>
                <div>
                  <strong>Pasta de Erros Linux:</strong>{" "}
                  <div className="input-icon-wrapper">
                  <FontAwesomeIcon icon={faFolder} className="input-wrapper-details"/>
                  <input className="input-detailsmodal" type="text" value= {empresa["pasta-erros-lnx"] || "Não disponível."} readOnly />
                  </div>
                </div>
                <div>
                  <strong>Pasta de Log Linux:</strong>{" "}
                  <div className="input-icon-wrapper">
                  <FontAwesomeIcon icon={faFolder} className="input-wrapper-details"/>
                  <input className="input-detailsmodal" type="text" value= {empresa["pasta-grava-log-linux"] || "Não disponível."} readOnly />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </Modal>
  );
};

export default DetalhesModal;
