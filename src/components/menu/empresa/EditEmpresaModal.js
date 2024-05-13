import React, { useState, useEffect } from "react";
import Modal from "./modalEmpresa";
import "./styleEditEmpresaModal.css";

const EditEmpresaModal = ({ isOpen, empresa, onClose, onSave }) => {
  const [tab, setTab] = useState("geral");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(empresa || {});
  }, [empresa]);

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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h2 className="title-editempresa">Editar Empresa</h2>
        <div className="container-editempresa">
        <div>
            <strong>Código:</strong>
            <span>{formData["cod-estabel"] || ''}</span>
          </div>
          <div>
            <strong>Nome:</strong>
            <span>{formData["nome"] || ''}</span>
          </div>
          <div>
            <strong>Razão Social:</strong>
            <span>{formData["razao-social"] || ''}</span>
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
              <label>
                <strong>Pasta de Entrada:</strong>
                <input type="text" name="pasta-entrada" value={formData["pasta-entrada"] || ''} onChange={handleChange} />
              </label>
              <label>
                <strong>Pasta Processo Email:</strong>
                <input type="text" name="pasta-proc-mail" value={formData["pasta-proc-mail"] || ''} onChange={handleChange} />
              </label>
              <label>
                <strong>Pasta Processo DFE:</strong>
                <input type="text" name="pasta-proc-dfe" value={formData["pasta-proc-dfe"] || ''} onChange={handleChange} />
              </label>
              <label>
                <strong>Pasta de Erros:</strong>
                <input type="text" name="pasta-erros" value={formData["pasta-erros"] || ''} onChange={handleChange} />
              </label>
              <label>
                <strong>Armazenagem do XML:</strong>
                <select name="cd-armazena" value={formData["cd-armazena"] || ''} onChange={handleChange}>
                  <option value={1}>Não Armazena</option>
                  <option value={2}>Armazena em Pasta Física</option>
                  <option value={3}>Armazena em Banco de Dados</option>
                </select>
              </label>
              <label>
                <strong>Habilita Pasta Log:</strong>
                <input type="checkbox" name="l-pasta-log" checked={formData["l-pasta-log"] || false} onChange={handleChange} />
              </label>
              <label>
                <strong>Pasta de Armazenagem:</strong>
                <input type="text" name="pasta-armaz" value={formData["pasta-armaz"] || ''} onChange={handleChange} />
              </label>
              <label>
                <strong>Pasta de Gravação do Log:</strong>
                <input type="text" name="pasta-grava-log" value={formData["pasta-grava-log"] || ''} onChange={handleChange} />
              </label>
            </div>
          )}
          { tab === "traducao" && (
                <div className="quadrante-editempresa">
                <label>
                    <strong>Utiliza Item Cliente/Fornecedor:</strong>
                    <input type="checkbox" name="l-item-fornec" checked={formData["l-item-fornec"] || false} onChange={handleChange} />
                </label>
                <label>
                    <strong>Utiliza FIFO Ordem de Compra:</strong>
                    <input type="checkbox" name="l-fifo-ordem-compra" checked={formData["l-fifo-ordem-compra"] || false} onChange={handleChange} />
                </label>
                <label>
                    <strong>Importa Observação XML:</strong>
                    <input type="checkbox" name="l-observacao" checked={formData["l-observacao"] || false} onChange={handleChange} />
                </label>
                <label>
                    <strong>Envia E-mail Eventos:</strong>
                    <input type="checkbox" name="l-email-eventos" checked={formData["l-email-eventos"] || false} onChange={handleChange} />
                </label>
                <label>
                    <strong>Mantém Impostos do XML na Capa:</strong>
                    <input type="checkbox" name="l-impostos-capa" checked={formData["l-impostos-capa"] || false} onChange={handleChange} />
                </label>
                <label>
                    <strong>Zera Valor IPI Outros:</strong>
                    <input type="checkbox" name="l-zera-ipi-outros" checked={formData["l-zera-ipi-outros"] || false} onChange={handleChange} />
                </label>
                <label>
                    <strong>Prioriza Documentos:</strong>
                    <input type="checkbox" name="l-prioriza-documento" checked={formData["l-prioriza-documento"] || false} onChange={handleChange} />
                </label>
                <label>
                    <strong>Informa Conta/CCusto Manual Item:</strong>
                    <input type="checkbox" name="l-conta-ccusto-manual" checked={formData["l-conta-ccusto-manual"] || false} onChange={handleChange} />
                </label>
                <label>
                    <strong>Usa Tag Ordem Compra:</strong>
                    <input type="checkbox" name="l-usa-tag-compra" checked={formData["l-usa-tag-compra"] || false} onChange={handleChange} />
                </label>
                <label>
                    <strong>Usa NCM Fornecedor:</strong>
                    <input type="checkbox" name="log-ncm-fornec" checked={formData["log-ncm-fornec"] || false} onChange={handleChange} />
                </label>
                <label>
                    <strong>Altera NCM do item:</strong>
                    <input type="checkbox" name="log-altera-ncm" checked={formData["log-altera-ncm"] || false} onChange={handleChange} />
                </label>
                <label>
                    <strong>Quantidade Manual:</strong>
                    <input type="checkbox" name="log-qt-manual" checked={formData["log-qt-manual"] || false} onChange={handleChange} />
                </label>
                <label>
                    <strong>Usa CST Fornecedor:</strong>
                    <input type="checkbox" name="log-cst-fornec" checked={formData["log-cst-fornec"] || false} onChange={handleChange} />
                </label>
                <label>
                    <strong>Usa Duplicata Documento XML:</strong>
                    <input type="checkbox" name="l-duplic-docum" checked={formData["l-duplic-docum"] || false} onChange={handleChange} />
                </label>
                <label>
                    <strong>Altera EAN/GTIN do item:</strong>
                    <input type="checkbox" name="log-altera-ean-gtin" checked={formData["log-altera-ean-gtin"] || false} onChange={handleChange} />
                </label>
                <label>
                    <strong>Grava Pesos Recebimento Físico:</strong>
                    <input type="checkbox" name="l-peso-doc-fisico" checked={formData["l-peso-doc-fisico"] || false} onChange={handleChange} />
                </label>
                <label>
                    <strong>Bloqueia Lançamento sem Confirmação:</strong>
                    <input type="checkbox" name="l-bloqueia-sem-confirmacao" checked={formData["l-bloqueia-sem-confirmacao"] || false} onChange={handleChange} />
                </label>
                <label>
                    <strong>Bloqueia UN Divergente:</strong>
                    <input type="checkbox" name="log-bloq-un-divergente" checked={formData["log-bloq-un-divergente"] || false} onChange={handleChange} />
                </label>
                <label>
                    <strong>Bloqueia OP Finalizada/Terminada:</strong>
                    <input type="checkbox" name="l-bloqueia-op-finaliz" checked={formData["l-bloqueia-op-finaliz"] || false} onChange={handleChange} />
                </label>
                <label>
                    <strong>Bloqueia NCM Divergente:</strong>
                    <input type="checkbox" name="log-bloqueio-ncm-diverg" checked={formData["log-bloqueio-ncm-diverg"] || false} onChange={handleChange} />
                </label>
                <label>
                    <strong>Bloqueia Divergência de Valor na Ordem de Compra:</strong>
                    <input type="checkbox" name="l-bloq-var-valor" checked={formData["l-bloq-var-valor"] || false} onChange={handleChange} />
                </label>
                <label>
                    <strong>Bloqueia Divergência de Quantidade na Ordem de Compra:</strong>
                    <input type="checkbox" name="l-bloq-var-quant" checked={formData["l-bloq-var-quant"] || false} onChange={handleChange} />
                </label>
                <label>
                    <strong>Bloqueia Estabelecimento OC Divergente:</strong>
                    <input type="checkbox" name="l-bloq-estab-diveg" checked={formData["l-bloq-estab-diveg"] || false} onChange={handleChange} />
                </label>
                <label>
                    <strong>Usa NCM Fornecedor em Débito Direto:</strong>
                    <input type="checkbox" name="l-subst-ncm-dd" checked={formData["l-subst-ncm-dd"] || false} onChange={handleChange} />
                </label>
                <label>
                    <strong>Contingência para Download do XML:</strong>
                    <input type="checkbox" name="l-contingencia-download-xml" checked={formData["l-contingencia-download-xml"] || false} onChange={handleChange} />
                </label>
                </div>
            )}
            {tab === "traducaoB" && (
              <div className="quadrante-editempresa">
                <label>
                  <strong>Devolução Nota Própria:</strong>
                  <input type="checkbox" name="log-depos-devol" checked={formData["log-depos-devol"] || false} onChange={handleChange} />
                </label>
                <label>
                  <strong>Depósito Devolução:</strong>
                  <input type="text" name="cod-depos-dev" value={formData["cod-depos-dev"] || ''} onChange={handleChange} />
                </label>
                <label>
                  <strong>Localização Devolução:</strong>
                  <input type="text" name="cod-localiz-dev" value={formData["cod-localiz-dev"] || ''} onChange={handleChange} />
                </label>
                <label>
                  <strong>Informações Lote Automática:</strong>
                  <input type="checkbox" name="l-fixa-lote" checked={formData["l-fixa-lote"] || false} onChange={handleChange} />
                </label>
                <label>
                  <strong>Lote Fixo:</strong>
                  <input type="text" name="lote" value={formData["lote"] || ''} onChange={handleChange} />
                </label>
                <label>
                  <strong>Data de Validade:</strong>
                  <input type="date" name="dt-valid-lote" value={formData["dt-valid-lote"] || ''} onChange={handleChange} />
                </label>
                <label>
                  <strong>Copia CT-e para GFE:</strong>
                  <input type="checkbox" name="l-copia-gfe" checked={formData["l-copia-gfe"] || false} onChange={handleChange} />
                </label>
                <label>
                  <strong>Pasta Cópia GFE:</strong>
                  <input type="text" name="pasta-gfe" value={formData["pasta-gfe"] || ''} onChange={handleChange} />
                </label>
                <label>
                  <strong>Anexos Divergência:</strong>
                  <input type="text" name="pasta-anexo-diverg" value={formData["pasta-anexo-diverg"] || ''} onChange={handleChange} />
                </label>
              </div>
            )}
            {tab === "configuracoes" && (
                <div className="quadrante-editempresa">
                  <label>
                    <strong>Servidor E-mail:</strong>
                    <input type="text" name="servidor-email" value={formData["servidor-email"] || ''} onChange={handleChange} />
                  </label>
                  <label>
                    <strong>E-mail NFe:</strong>
                    <input type="text" name="e-mail-nfe" value={formData["e-mail-nfe"] || ''} onChange={handleChange} />
                  </label>
                  <label>
                    <strong>Senha E-mail:</strong>
                    <input type="password" name="senha-email" value={formData["senha-email"] || ''} onChange={handleChange} />
                  </label>
                  <label>
                    <strong>Tipo Conexão:</strong>
                    <select name="tipo-conexao-mail" value={formData["tipo-conexao-mail"] || ''} onChange={handleChange}>
                      <option value="1">Segura</option>
                      <option value="2">Não Segura</option>
                    </select>
                  </label>
                  <label>
                    <strong>Cliente ID:</strong>
                    <input type="text" name="client-id" value={formData["client-id"] || ''} onChange={handleChange} />
                  </label>
                  <label>
                    <strong>Tenant ID:</strong>
                    <input type="text" name="tenant-id" value={formData["tenant-id"] || ''} onChange={handleChange} />
                  </label>
                  <label>
                    <strong>Ambiente SEFAZ:</strong>
                    <input type="text" name="ambiente-sefaz" value={formData["ambiente-sefaz"] || ''} onChange={handleChange} />
                  </label>
                  <label>
                    <strong>Ambiente Destinada:</strong>
                    <input type="text" name="ambiente-destinadas" value={formData["ambiente-destinadas"] || ''} onChange={handleChange} />
                  </label>
                  <label>
                    <strong>Tipo Certificado:</strong>
                    <select name="tipo-certificado" value={formData["tipo-certificado"] || ''} onChange={handleChange}>
                      <option value="A1">A1</option>
                      <option value="A3">A3</option>
                    </select>
                  </label>
                  <label>
                    <strong>Senha Certificado:</strong>
                    <input type="password" name="senha-certificado" value={formData["senha-certificado"] || ''} onChange={handleChange} />
                  </label>
                  <label>
                    <strong>Arquivo Certificado:</strong>
                    <input type="text" name="arquivo-certificado" value={formData["arquivo-certificado"] || ''} onChange={handleChange} />
                  </label>
                  <label>
                    <strong>Pasta Arq Configuração:</strong>
                    <input type="text" name="pasta-arq-config" value={formData["pasta-arq-config"] || ''} onChange={handleChange} />
                  </label>
                  <label>
                    <strong>Nome Arq Config:</strong>
                    <input type="text" name="nome-arq-config" value={formData["nome-arq-config"] || ''} onChange={handleChange} />
                  </label>
                  <label>
                    <strong>Utiliza Proxy:</strong>
                    <input type="checkbox" name="l-utiliza-proxy" checked={formData["l-utiliza-proxy"] || false} onChange={handleChange} />
                  </label>
                  <label>
                    <strong>Servidor Proxy:</strong>
                    <input type="text" name="servidor-proxy" value={formData["servidor-proxy"] || ''} onChange={handleChange} />
                  </label>
                  <label>
                    <strong>Porta:</strong>
                    <input type="number" name="porta-proxy" value={formData["porta-proxy"] || ''} onChange={handleChange} />
                  </label>
                  <label>
                    <strong>Usuário Proxy:</strong>
                    <input type="text" name="usuario-proxy" value={formData["usuario-proxy"] || ''} onChange={handleChange} />
                  </label>
                  <label>
                    <strong>Senha Proxy:</strong>
                    <input type="password" name="senha-proxy" value={formData["senha-proxy"] || ''} onChange={handleChange} />
                  </label>
                </div>
              )}
              {tab === "servidor" && (
                <div className="quadrante-editempresa">
                  <label>
                    <strong>Usa Linux RPW:</strong>
                    <input type="checkbox" name="l-usa-linux-rpw" checked={formData["l-usa-linux-rpw"] || false} onChange={handleChange} />
                  </label>
                  <label>
                    <strong>Arquivo Certificado Linux:</strong>
                    <input type="text" name="cod-arq-certificado-lnx" value={formData["cod-arq-certificado-lnx"] || ''} onChange={handleChange} />
                  </label>
                  <label>
                    <strong>Nome Arquivo Configuração Linux:</strong>
                    <input type="text" name="nome-arq-config-lnx" value={formData["nome-arq-config-lnx"] || ''} onChange={handleChange} />
                  </label>
                  <label>
                    <strong>Pasta Arquivo Configuração Linux:</strong>
                    <input type="text" name="pasta-arq-config-lnx" value={formData["pasta-arq-config-lnx"] || ''} onChange={handleChange} />
                  </label>
                  <label>
                    <strong>Pasta de Entrada Linux:</strong>
                    <input type="text" name="pasta-entrada-lnx" value={formData["pasta-entrada-lnx"] || ''} onChange={handleChange} />
                  </label>
                  <label>
                    <strong>Pasta Processo E-mail Linux:</strong>
                    <input type="text" name="pasta-proc-mail-lnx" value={formData["pasta-proc-mail-lnx"] || ''} onChange={handleChange} />
                  </label>
                  <label>
                    <strong>Pasta Processo DFE Linux:</strong>
                    <input type="text" name="pasta-proc-dfe-lnx" value={formData["pasta-proc-dfe-lnx"] || ''} onChange={handleChange} />
                  </label>
                  <label>
                    <strong>Pasta de Erros Linux:</strong>
                    <input type="text" name="pasta-erros-lnx" value={formData["pasta-erros-lnx"] || ''} onChange={handleChange} />
                  </label>
                  <label>
                    <strong>Pasta de Log Linux:</strong>
                    <input type="text" name="pasta-grava-log-linux" value={formData["pasta-grava-log-linux"] || ''} onChange={handleChange} />
                  </label>
                </div>
              )}
        </div>
        <button type="submit" className="button-primary-editempresa">Salvar Alterações</button>
        <button type="button" onClick={onClose} className="button-secondary-editempresa">Cancelar</button>
      </form>
    </Modal>
  );
};

export default EditEmpresaModal;
