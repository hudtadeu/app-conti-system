import React, { useState } from "react";
import Modal from "./modalEmpresa";
import "./styleDetalhesModal.css";

const DetalhesModal = ({ isOpen, empresa, onClose }) => {
  const [tab, setTab] = useState("geral");
  console.log("Conteudo da empresa:", empresa);
  const changeTab = (newTab) => {
    setTab(newTab);
  };

  const getCheckboxHTML = (condition) => {
    return <input type="checkbox" checked={condition} disabled />;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {empresa ? (
        <div>
          <h2 className="title-details">Detalhes da Empresa</h2>
          <div className="container-datails">
            <p>
              <strong>Código:</strong> {empresa["cod-estabel"]}
            </p>
            <p>
              <strong>Nome:</strong> {empresa["nome"]}
            </p>
            <p>
              <strong>Razão Social:</strong> {empresa["razao-social"]}
            </p>
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
                <p>
                  <strong>Pasta de Entrada:</strong> {empresa["pasta-entrada"]}
                </p>
                <p>
                  <strong>Pasta Processo Email:</strong>{" "}
                  {empresa["pasta-proc-mail"]}
                </p>
                <p>
                  <strong>Pasta Processo DFE:</strong>{" "}
                  {empresa["pasta-proc-dfe"]}
                </p>
                <p>
                  <strong>Pasta de Erros:</strong> {empresa["pasta-erros"]}
                </p>
                <p>
                  <strong>Armazenagem do XML:</strong>
                </p>
                <ul>
                  <li>
                    Não Armazena:{" "}
                    {getCheckboxHTML(empresa["cd-armazena"] === 1)}
                  </li>
                  <li>
                    Armazena em Pasta Física:{" "}
                    {getCheckboxHTML(empresa["cd-armazena"] === 2)}
                  </li>
                  <li>
                    Armazena em Banco de Dados:{" "}
                    {getCheckboxHTML(empresa["cd-armazena"] === 3)}
                  </li>
                </ul>
                <p>
                  <strong>Habilita Pasta Log:</strong>{" "}
                  {getCheckboxHTML(empresa["l-pasta-log"])}
                </p>
                <p>
                  <strong>Pasta de Armazenagem:</strong>{" "}
                  {empresa["pasta-armaz"]}
                </p>
                <p>
                  <strong>Pasta de Gravação do Log:</strong>{" "}
                  {empresa["pasta-grava-log"]}
                </p>
              </div>
            )}

            {tab === "traducao" && (
              <div className="quadrante-traducao">
                <p>
                  <strong>Utiliza Item Cliente/Fornecedor:</strong>{" "}
                  {getCheckboxHTML(empresa["l-item-fornec"])}
                </p>
                <p>
                  <strong>Utiliza FIFO Ordem de Compra:</strong>{" "}
                  {getCheckboxHTML(empresa["l-fifo-ordem-compra"])}
                </p>
                <p>
                  <strong>Importa Observação XML:</strong>{" "}
                  {getCheckboxHTML(empresa["l-observacao"])}
                </p>
                <p>
                  <strong>Envia E-mail Eventos:</strong>{" "}
                  {getCheckboxHTML(empresa["l-email-eventos"])}
                </p>
                <p>
                  <strong>Mantém Impostos do XML na Capa:</strong>{" "}
                  {getCheckboxHTML(empresa["l-impostos-capa"])}
                </p>
                <p>
                  <strong>Zera Valor IPI Outros:</strong>{" "}
                  {getCheckboxHTML(empresa["l-zera-ipi-outros"])}
                </p>
                <p>
                  <strong>Prioriza Documentos:</strong>{" "}
                  {getCheckboxHTML(empresa["l-prioriza-documento"])}
                </p>
                <p>
                  <strong>Informa Conta/CCusto Manual Item:</strong>{" "}
                  {getCheckboxHTML(empresa.lPriorizaDocumento)}
                </p>
                <p>
                  <strong>Usa Tag Ordem Compra:</strong>{" "}
                  {getCheckboxHTML(empresa["l-usa-tag-compra"])}
                </p>
                <p>
                  <strong>Usa NCM Fornecedor:</strong>{" "}
                  {getCheckboxHTML(empresa["log-ncm-fornec"])}
                </p>
                <p>
                  <strong>Altera NCM do item:</strong>{" "}
                  {getCheckboxHTML(empresa["log-altera-ncm"])}
                </p>
                <p>
                  <strong>Quantidade Manual:</strong>{" "}
                  {getCheckboxHTML(empresa["log-qt-manual"])}
                </p>
                <p>
                  <strong>Usa CST Fornecedor:</strong>{" "}
                  {getCheckboxHTML(empresa["log-cst-fornec"])}
                </p>
                <p>
                  <strong>Usa Duplicata Documento XML:</strong>{" "}
                  {getCheckboxHTML(empresa["l-duplic-docum"])}
                </p>
                <p>
                  <strong>Altera EAN/GTIN do item:</strong>{" "}
                  {getCheckboxHTML(empresa["log-altera-ean-gtin"])}
                </p>
                <p>
                  <strong>Grava Pesos Recebimento Físico:</strong>{" "}
                  {getCheckboxHTML(empresa["l-peso-doc-fisico"])}
                </p>
                <p>
                  <strong>Bloqueia Lançamento sem Confirmação:</strong>{" "}
                  {getCheckboxHTML(empresa.lPriorizaDocumento)}
                </p>
                <p>
                  <strong>Bloqueia UN Divergente:</strong>{" "}
                  {getCheckboxHTML(empresa["log-bloq-un-divergente"])}
                </p>
                <p>
                  <strong>Bloqueia OP Finaliz/Terminada:</strong>{" "}
                  {getCheckboxHTML(empresa["l-bloqueia-op-finaliz"])}
                </p>
                <p>
                  <strong>Bloqueia NCM Divergente:</strong>{" "}
                  {getCheckboxHTML(empresa["log-bloqueio-ncm-diverg"])}
                </p>
                <p>
                  <strong>Bloqueia Diverg Valor OC:</strong>{" "}
                  {getCheckboxHTML(empresa["l-bloq-var-valor"])}
                </p>
                <p>
                  <strong>Bloqueia Diverg Quantidade OC:</strong>{" "}
                  {getCheckboxHTML(empresa["l-bloq-var-quant"])}
                </p>
                <p>
                  <strong>Bloqueia Estab OC Divergente:</strong>{" "}
                  {getCheckboxHTML(empresa["l-bloq-estab-diveg"])}
                </p>
                <p>
                  <strong>Usa NCM Fornecedor Debito Direto:</strong>{" "}
                  {getCheckboxHTML(empresa["l-subst-ncm-dd"])}
                </p>
                <p>
                  <strong>Contingência Download XML:</strong>{" "}
                  {getCheckboxHTML(empresa.lPriorizaDocumento)}
                </p>
              </div>
            )}
            {tab === "traducaoB" && (
              <div className="quadrante-details">
                <p>
                  <strong>Devolução Nota Própria:</strong>{" "}
                  {getCheckboxHTML(empresa["log-depos-devol"])} Define Depósito
                  de Devolução
                </p>
                <p>
                  <strong>Depos Devolução:</strong>{" "}
                  {empresa["cod-depos-dev"] || "Não encontrado"}
                </p>
                <p>
                  <strong>Localiz Devolução:</strong>{" "}
                  {empresa["cod-localiz-dev"] || "Não encontrado"}
                </p>
                <p>
                  <strong>Informações Lote Automática:</strong>{" "}
                  {getCheckboxHTML(empresa["l-fixa-lote"])} Insere Lote Fixo
                </p>
                <p>
                  <strong>Lote Fixo:</strong>{" "}
                  {empresa["lote"] || "Não encontrado"}{" "}
                  <strong>Dt Validade:</strong>{" "}
                  {empresa["dt-valid-lote"] || "Não encontrado"}
                </p>
                <p>
                  {getCheckboxHTML(empresa["l-copia-gfe"])} Copia CT-e para GFE
                </p>
                <p>
                  <strong>Pasta Cópia GFE:</strong>{" "}
                  {empresa["pasta-gfe"] || "Não encontrado"}
                </p>
                <p>
                  <strong>Anexos Divergência:</strong>{" "}
                  {empresa["pasta-anexo-diverg"] || "Não encontrado"}
                </p>
              </div>
            )}

            {tab === "configuracoes" && (
              <div className="quadrante-details">
                <p>
                  <strong>Servidor E-mail:</strong> {empresa["servidor-email"]}
                </p>
                <p>
                  <strong>E-mail NFe:</strong> {empresa["e-mail-nfe"]}
                </p>
                <p>
                  <strong>Senha E-mail:</strong>{" "}
                  {empresa["senha-email"] ? "********" : "Não definida"}
                </p>
                <p>
                  <strong>Tipo Conexão:</strong>{" "}
                  {empresa["tipo-conexao-mail"] === 1 ? "Segura" : "Não segura"}
                </p>
                <p>
                  <strong>Cliente ID:</strong>{" "}
                  {empresa["client-id"] || "Não encontrado"}
                </p>
                <p>
                  <strong>Tenant ID:</strong>{" "}
                  {empresa["tenant-id"] || "Não encontrado"}
                </p>
                <p>
                  <strong>Ambiente SEFAZ:</strong> {empresa["ambiente-sefaz"]}
                </p>
                <p>
                  <strong>Ambiente Destinada:</strong>{" "}
                  {empresa["ambiente-destinadas"]}
                </p>
                <p>
                  <strong>Tipo Certificado:</strong>{" "}
                  {empresa["tipo-certificado"] === 1
                    ? "A1"
                    : empresa["tipo-certificado"] === 2
                    ? "A3"
                    : "Não especificado"}
                </p>
                <p>
                  <strong>Senha Certificado:</strong>{" "}
                  {empresa["senha-certificado"] ? "********" : "Não definida"}
                </p>
                <p>
                  <strong>Arquivo Certificado:</strong> {empresa[""]}
                </p>
                <p>
                  <strong>Pasta Arq Configuração:</strong>{" "}
                  {empresa["pasta-arq-config"]}
                </p>
                <p>
                  <strong>Nome Arq Config:</strong> {empresa["nome-arq-config"]}
                </p>
                <p>
                  <strong>Utiliza Proxy:</strong>{" "}
                  {empresa["l-utiliza-proxy"] ? "Sim" : "Não"}
                </p>
                <p>
                  <strong>Servidor Proxy:</strong>{" "}
                  {empresa["servidor-proxy"] || "Não encontrado"}
                </p>
                <p>
                  <strong>Porta:</strong> {empresa["porta-proxy"]}
                </p>
                <p>
                  <strong>Usuário Proxy:</strong>{" "}
                  {empresa["usuario-proxy"] || "Não encontrado"}
                </p>
                <p>
                  <strong>Senha Proxy:</strong>{" "}
                  {empresa["senha-proxy"] ? "********" : "Não definida"}
                </p>
              </div>
            )}

            {tab === "servidor" && (
              <div className="quadrante-details">
                {" "}
                <p>
                  <strong>Usa Linux RPW:</strong>{" "}
                  {getCheckboxHTML(empresa["l-usa-linux-rpw"])}
                </p>
                <p>
                  <strong>Arquivo Certificado Linux:</strong>{" "}
                  {empresa["cod-arq-certificado-lnx"] || "Não disponível"}
                </p>
                <p>
                  <strong>Nome Arquivo Configuração Linux:</strong>{" "}
                  {empresa["nome-arq-config-lnx"] || "Não disponível"}
                </p>
                <p>
                  <strong>Pasta Arquivo Configuração Linux:</strong>{" "}
                  {empresa["pasta-arq-config-lnx"] || "Não disponível"}
                </p>
                <p>
                  <strong>Pasta de Entrada Linux:</strong>{" "}
                  {empresa["pasta-entrada-lnx"] || "Não disponível"}
                </p>
                <p>
                  <strong>Pasta Processo E-mail Linux:</strong>{" "}
                  {empresa["pasta-proc-mail-lnx"] || "Não encontrado"}
                </p>
                <p>
                  <strong>Pasta Processo DFE Linux:</strong>{" "}
                  {empresa["pasta-proc-dfe-lnx"] || "Não encontrado"}
                </p>
                <p>
                  <strong>Pasta de Erros Linux:</strong>{" "}
                  {empresa["pasta-erros-lnx"] || "Não disponível"}
                </p>
                <p>
                  <strong>Pasta de Log Linux:</strong>{" "}
                  {empresa["pasta-grava-log-linux"] || "Não disponível"}
                </p>
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
