import React, { useState } from "react";
import Modal from "./modalEmpresa";
import "./styleEditEmpresaModal.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faWarehouse, faServer, faFileInvoice, faLock, faNetworkWired, faTag, faGlobe, faCertificate, faUndoAlt, faMapMarkerAlt, faBox, faPaperclip, faCalendarAlt, faUser, faDoorClosed, faFile } from '@fortawesome/free-solid-svg-icons';
import "./styleNovaEmpresa.css";

const NovaEmpresaModal = ({ isOpen, onClose, onSave }) => {
  const [tab, setTab] = useState("geral");
  const [formData, setFormData] = useState({
    "cod-estabel": "",
    "nome": "",
    "razao-social": "",
    "pasta-entrada": "",
    "pasta-proc-mail": "",
    "pasta-proc-dfe": "",
    "pasta-erros": "",
    "cd-armazena": "",
    "l-pasta-log": false,
    "pasta-armaz": "",
    "pasta-grava-log": "",
    // Inicialize outros campos conforme necessário
  });

  const changeTab = (newTab) => {
    setTab(newTab);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1]?.focus();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-contentedit-fixed">
        <form onSubmit={handleSubmit}>
          <h2 className="title-editempresa">Nova Empresa</h2>
          <div className="container-editempresa">
            <div>
              <strong>Código:</strong>
              <input type="text" className="newempresa-input" name="cod-estabel" value={formData["cod-estabel"]} onChange={handleChange} onKeyDown={handleKeyDown} />
            </div>
            <div>
              <strong>Nome:</strong>
              <input type="text" className="newempresa-input" name="nome" value={formData["nome"]} onChange={handleChange} onKeyDown={handleKeyDown} />
            </div>
            <div>
              <strong>Razão Social:</strong>
              <input type="text" className="newempresa-input" name="razao-social" value={formData["razao-social"]} onChange={handleChange} onKeyDown={handleKeyDown} />
            </div>
          </div>
          <div className="btn-group-editempresa">
            <button type="button" id="geralButton" onClick={() => changeTab("geral")} className={tab === "geral" ? "active" : ""}>Geral</button>
            <button type="button" id="traducaoButton" onClick={() => changeTab("traducao")} className={tab === "traducao" ? "active" : ""}>Tradução</button>
            <button type="button" id="traducaoButtonB" onClick={() => changeTab("traducaoB")} className={tab === "traducaoB" ? "active" : ""}>Tradução ||</button>
            <button type="button" id="configuracoesButton" onClick={() => changeTab("configuracoes")} className={tab === "configuracoes" ? "active" : ""}>Configurações</button>
            <button type="button" id="servidorButton" onClick={() => changeTab("servidor")} className={tab === "servidor" ? "active" : ""}>Servidor RPW</button>
          </div>
          <div className="tab-content-editempresa">
            {tab === "geral" && (
              <div className="quadrante-editempresa">
                <div>
                  <strong>Pasta de Entrada:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-entrada" value={formData["pasta-entrada"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Pasta Processo Email:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-proc-mail" value={formData["pasta-proc-mail"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Pasta Processo DFE:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-proc-dfe" value={formData["pasta-proc-dfe"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Pasta de Erros:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-erros" value={formData["pasta-erros"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Armazenagem do XML:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faWarehouse} className="icon" />
                    <select name="cd-armazena" value={formData["cd-armazena"]} onChange={handleChange} onKeyDown={handleKeyDown}>
                      <option value={1}>Não Armazena</option>
                      <option value={2}>Armazena em Pasta Física</option>
                      <option value={3}>Armazena em Banco de Dados</option>
                    </select>
                  </div>
                </div>
                <div>
                  <strong>Habilita Pasta Log:</strong>
                  <input type="checkbox" name="l-pasta-log" checked={formData["l-pasta-log"]} onChange={handleChange} onKeyDown={handleKeyDown}/>
                </div>
                <div>
                  <strong>Pasta de Armazenagem:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-armaz" value={formData["pasta-armaz"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Pasta de Gravação do Log:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-grava-log" value={formData["pasta-grava-log"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
              </div>
            )}
            {tab === "traducao" && (
              <div className="quadrante-editempresatraducao">
                <div>
                    <strong>Utiliza Item Cliente/Fornecedor:</strong>
                    <input type="checkbox" name="l-item-fornec" checked={formData["l-item-fornec"]} onChange={handleChange} />
                </div>
                <div>
                    <strong>Utiliza FIFO Ordem de Compra:</strong>
                    <input type="checkbox" name="l-fifo-ordem-compra" checked={formData["l-fifo-ordem-compra"]} onChange={handleChange} />
                </div>
                <div>
                    <strong>Importa Observação XML:</strong>
                    <input type="checkbox" name="l-observacao" checked={formData["l-observacao"]} onChange={handleChange} />
                </div>
                <div>
                    <strong>Envia E-mail Eventos:</strong>
                    <input type="checkbox" name="l-email-eventos" checked={formData["l-email-eventos"]} onChange={handleChange} />
                </div>
                <div>
                    <strong>Mantém Impostos do XML na Capa:</strong>
                    <input type="checkbox" name="l-impostos-capa" checked={formData["l-impostos-capa"]} onChange={handleChange} />
                </div>
                <div>
                    <strong>Zera Valor IPI Outros:</strong>
                    <input type="checkbox" name="l-zera-ipi-outros" checked={formData["l-zera-ipi-outros"]} onChange={handleChange} />
                </div>
                <div>
                    <strong>Prioriza Documentos:</strong>
                    <input type="checkbox" name="l-prioriza-documento" checked={formData["l-prioriza-documento"]} onChange={handleChange} />
                </div>
                <div>
                    <strong>Informa Conta/CCusto Manual Item:</strong>
                    <input type="checkbox" name="l-conta-ccusto-manual" checked={formData["l-conta-ccusto-manual"]} onChange={handleChange} />
                </div>
                <div>
                    <strong>Usa Tag Ordem Compra:</strong>
                    <input type="checkbox" name="l-usa-tag-compra" checked={formData["l-usa-tag-compra"]} onChange={handleChange} />
                </div>
                <div>
                    <strong>Usa NCM Fornecedor:</strong>
                    <input type="checkbox" name="log-ncm-fornec" checked={formData["log-ncm-fornec"]} onChange={handleChange} />
                </div>
                <div>
                    <strong>Altera NCM do item:</strong>
                    <input type="checkbox" name="log-altera-ncm" checked={formData["log-altera-ncm"]} onChange={handleChange} />
                </div>
                <div>
                    <strong>Quantidade Manual:</strong>
                    <input type="checkbox" name="log-qt-manual" checked={formData["log-qt-manual"]} onChange={handleChange} />
                </div>
                <div>
                    <strong>Usa CST Fornecedor:</strong>
                    <input type="checkbox" name="log-cst-fornec" checked={formData["log-cst-fornec"]} onChange={handleChange} />
                </div>
                <div>
                    <strong>Usa Duplicata Documento XML:</strong>
                    <input type="checkbox" name="l-duplic-docum" checked={formData["l-duplic-docum"]} onChange={handleChange} />
                </div>
                <div>
                    <strong>Altera EAN/GTIN do item:</strong>
                    <input type="checkbox" name="log-altera-ean-gtin" checked={formData["log-altera-ean-gtin"]} onChange={handleChange} />
                </div>
                <div>
                    <strong>Grava Pesos Recebimento Físico:</strong>
                    <input type="checkbox" name="l-peso-doc-fisico" checked={formData["l-peso-doc-fisico"]} onChange={handleChange} />
                </div>
                <div>
                    <strong>Bloqueia Lançamento sem Confirmação:</strong>
                    <input type="checkbox" name="l-bloqueia-sem-confirmacao" checked={formData["l-bloqueia-sem-confirmacao"]} onChange={handleChange} />
                </div>
                <div>
                    <strong>Bloqueia UN Divergente:</strong>
                    <input type="checkbox" name="log-bloq-un-divergente" checked={formData["log-bloq-un-divergente"]} onChange={handleChange} />
                </div>
                <div>
                    <strong>Bloqueia OP Finalizada/Terminada:</strong>
                    <input type="checkbox" name="l-bloqueia-op-finaliz" checked={formData["l-bloqueia-op-finaliz"]} onChange={handleChange} />
                </div>
                <div>
                    <strong>Bloqueia NCM Divergente:</strong>
                    <input type="checkbox" name="log-bloqueio-ncm-diverg" checked={formData["log-bloqueio-ncm-diverg"]} onChange={handleChange} />
                </div>
                <div className="flex-break">
                    <strong>Bloqueia Divergência de Valor na Ordem de Compra:</strong>
                    <input type="checkbox" name="l-bloq-var-valor" checked={formData["l-bloq-var-valor"]} onChange={handleChange} />
                </div>
                <div className="flex-break">
                    <strong>Bloqueia Divergência de Quantidade na Ordem de Compra:</strong>
                    <input type="checkbox" name="l-bloq-var-quant" checked={formData["l-bloq-var-quant"]} onChange={handleChange} />
                </div>
                <div>
                    <strong>Bloqueia Estabelecimento OC Divergente:</strong>
                    <input type="checkbox" name="l-bloq-estab-diveg" checked={formData["l-bloq-estab-diveg"]} onChange={handleChange} />
                </div>
                <div>
                    <strong>Usa NCM Fornecedor em Débito Direto:</strong>
                    <input type="checkbox" name="l-subst-ncm-dd" checked={formData["l-subst-ncm-dd"]} onChange={handleChange} />
                </div>
                <div>
                    <strong>Contingência para Download do XML:</strong>
                    <input type="checkbox" name="l-contingencia-download-xml" checked={formData["l-contingencia-download-xml"]} onChange={handleChange} />
                </div>
              </div>
            )}
            {tab === "traducaoB" && (
              <div className="quadrante-editempresa">
                <div>
                  <strong>Devolução Nota Própria:</strong>
                  <input type="checkbox" name="log-depos-devol" checked={formData["log-depos-devol"]} onChange={handleChange} onKeyDown={handleKeyDown}/>
                </div>
                <div>
                  <strong>Depósito Devolução:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faUndoAlt} className="icon" />
                    <input type="text" name="cod-depos-dev" value={formData["cod-depos-dev"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Localização Devolução:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                    <input type="text" name="cod-localiz-dev" value={formData["cod-localiz-dev"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Informações Lote Automática:</strong>
                  <input type="checkbox" name="l-fixa-lote" checked={formData["l-fixa-lote"]} onChange={handleChange} onKeyDown={handleKeyDown}/>
                </div>
                <div>
                  <strong>Lote Fixo:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faBox} className="icon" />
                    <input type="text" name="lote" value={formData["lote"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Data de Validade:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                    <input type="date" name="dt-valid-lote" value={formData["dt-valid-lote"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Copia CT-e para GFE:</strong>
                  <input type="checkbox" name="l-copia-gfe" checked={formData["l-copia-gfe"]} onChange={handleChange} onKeyDown={handleKeyDown}/>
                </div>
                <div>
                  <strong>Pasta Cópia GFE:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-gfe" value={formData["pasta-gfe"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Anexos Divergência:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faPaperclip} className="icon" />
                    <input type="text" name="pasta-anexo-diverg" value={formData["pasta-anexo-diverg"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
              </div>
            )}
            {tab === "configuracoes" && (
              <div className="quadrante-editempresaconfiguracoes">
                <div>
                  <strong>Servidor E-mail:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faServer} className="icon" />
                    <input type="text" name="servidor-email" value={formData["servidor-email"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>E-mail NFe:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFileInvoice} className="icon" />
                    <input type="text" name="e-mail-nfe" value={formData["e-mail-nfe"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Senha E-mail:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faLock} className="icon" />
                    <input type="password" name="senha-email" value={formData["senha-email"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Tipo Conexão:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faNetworkWired} className="icon" />
                    <select name="tipo-conexao-mail" value={formData["tipo-conexao-mail"]} onChange={handleChange} onKeyDown={handleKeyDown}>
                      <option value="1">Segura</option>
                      <option value="2">Não Segura</option>
                    </select>
                  </div>
                </div>
                <div>
                  <strong>Cliente ID:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faTag} className="icon" />
                    <input type="text" name="client-id" value={formData["client-id"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Tenant ID:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faTag} className="icon" />
                    <input type="text" name="tenant-id" value={formData["tenant-id"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Ambiente SEFAZ:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faGlobe} className="icon" />
                    <input type="text" name="ambiente-sefaz" value={formData["ambiente-sefaz"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Ambiente Destinada:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faGlobe} className="icon" />
                    <input type="text" name="ambiente-destinadas" value={formData["ambiente-destinadas"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Tipo Certificado:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faCertificate} className="icon" />
                    <select name="tipo-certificado" value={formData["tipo-certificado"]} onChange={handleChange} onKeyDown={handleKeyDown}>
                      <option value="A1">A1</option>
                      <option value="A3">A3</option>
                    </select>
                  </div>
                </div>
                <div>
                  <strong>Senha Certificado:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faLock} className="icon" />
                    <input type="password" name="senha-certificado" value={formData["senha-certificado"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Arquivo Certificado:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFile} className="icon" />
                    <input type="text" name="arquivo-certificado" value={formData["arquivo-certificado"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Pasta Arq Configuração:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFile} className="icon" />
                    <input type="text" name="pasta-arq-config" value={formData["pasta-arq-config"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Nome Arq Config:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFile} className="icon" />
                    <input type="text" name="nome-arq-config" value={formData["nome-arq-config"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div className="proxy-edit">
                  <strong>Utiliza Proxy:</strong>
                  <input type="checkbox" name="l-utiliza-proxy" checked={formData["l-utiliza-proxy"]} onChange={handleChange} onKeyDown={handleKeyDown}/>
                </div>
                <div>
                  <strong>Servidor Proxy:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faServer} className="icon" />
                    <input type="text" name="servidor-proxy" value={formData["servidor-proxy"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Porta:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faDoorClosed} className="icon" />
                    <input type="number" name="porta-proxy" value={formData["porta-proxy"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Usuário Proxy:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <input type="text" name="usuario-proxy" value={formData["usuario-proxy"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Senha Proxy:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faLock} className="icon" />
                    <input type="password" name="senha-proxy" value={formData["senha-proxy"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
              </div>
            )}
            {tab === "servidor" && (
              <div className="quadrante-editempresa">
                <div>
                  <strong>Usa Linux RPW:</strong>
                  <input type="checkbox" name="l-usa-linux-rpw" checked={formData["l-usa-linux-rpw"]} onChange={handleChange} onKeyDown={handleKeyDown}/>
                </div>
                <div>
                  <strong>Arquivo Certificado Linux:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFile} className="icon" />
                    <input type="text" name="cod-arq-certificado-lnx" value={formData["cod-arq-certificado-lnx"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Nome Arquivo Configuração Linux:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFile} className="icon" />
                    <input type="text" name="nome-arq-config-lnx" value={formData["nome-arq-config-lnx"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Pasta Arquivo Configuração Linux:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-arq-config-lnx" value={formData["pasta-arq-config-lnx"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Pasta de Entrada Linux:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-entrada-lnx" value={formData["pasta-entrada-lnx"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Pasta Processo E-mail Linux:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-proc-mail-lnx" value={formData["pasta-proc-mail-lnx"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Pasta Processo DFE Linux:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-proc-dfe-lnx" value={formData["pasta-proc-dfe-lnx"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Pasta de Erros Linux:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-erros-lnx" value={formData["pasta-erros-lnx"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Pasta de Log Linux:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-grava-log-linux" value={formData["pasta-grava-log-linux"]} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
              </div>
            )}
          </div>
          <button type="submit" className="button-primary-editempresa">Salvar Nova Empresa</button>
          <button type="button" onClick={onClose} className="button-secondary-editempresa">Cancelar</button>
        </form>
      </div>
    </Modal>
  );
};

export default NovaEmpresaModal;
