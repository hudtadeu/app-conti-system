import React, { useState, useEffect } from "react";
import Modal from "./modalEmpresa";
import * as Tooltip from '@radix-ui/react-tooltip';
import "./styleEditEmpresaModal.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile, faUndoAlt, faMapMarkerAlt, faBox, faPaperclip, faServer, faFileInvoice, faLock, faNetworkWired, faTag, faUser, faGlobe, faDoorClosed, faCalendarAlt, faWarehouse, faCertificate, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const EditEmpresaModal = ({ isOpen, empresa, onClose, onSave }) => {
  const [tab, setTab] = useState("geral");
  const [formData, setFormData] = useState({});
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });
  const [isCertPasswordModalOpen, setIsCertPasswordModalOpen] = useState(false);
  const [certPasswordData, setCertPasswordData] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmNewPassword: false,
  });

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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1]?.focus();
    }
  };

  const handlePasswordModalOpen = () => {
    setIsPasswordModalOpen(true);
  };

  const handlePasswordModalClose = () => {
    setIsPasswordModalOpen(false);
  };

  const handleCertPasswordModalOpen = () => {
    setIsCertPasswordModalOpen(true);
  };

  const handleCertPasswordModalClose = () => {
    setIsCertPasswordModalOpen(false);
  };

  const handlePasswordInputChange = (event) => {
    const { name, value } = event.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handleCertPasswordInputChange = (event) => {
    const { name, value } = event.target;
    setCertPasswordData({
      ...certPasswordData,
      [name]: value
    });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert("A nova senha e a confirmação não são iguais.");
      return;
    }

    const encodedPassword = btoa(passwordData.newPassword);
    const payload = {
      pwMail64: encodedPassword
    };

    const token = sessionStorage.getItem('token');

    if (!token) {
      alert("Token de autenticação não encontrado. Por favor, faça login novamente.");
      return;
    }

    console.log("Payload to be sent:", payload);

    fetch(`http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/boRequestEmpresa/byid/uppwdm/${empresa.cId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Response from API:", data);
      if (data.success) {
        alert("Senha atualizada com sucesso!");
        handlePasswordModalClose();
      } else {
        alert("Erro ao atualizar a senha.");
      }
    })
    .catch(error => {
      console.error("Error during API call:", error);
      alert("Erro ao atualizar a senha. Verifique o console para mais detalhes.");
    });
  };

  const handleCertPasswordChange = (e) => {
    e.preventDefault();

    if (certPasswordData.newPassword !== certPasswordData.confirmNewPassword) {
      alert("A nova senha e a confirmação não são iguais.");
      return;
    }

    const encodedPassword = btoa(certPasswordData.newPassword);
    const payload = {
      pwCert64: encodedPassword
    };

    const token = sessionStorage.getItem('token');

    if (!token) {
      alert("Token de autenticação não encontrado. Por favor, faça login novamente.");
      return;
    }

    console.log("Payload to be sent:", payload);

    fetch(`http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/boRequestEmpresa/byid/uppwdcr/${empresa.cId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Response from API:", data);
      if (data.success) {
        alert("Senha do certificado atualizada com sucesso!");
        handleCertPasswordModalClose();
      } else {
        alert("Erro ao atualizar a senha do certificado.");
      }
    })
    .catch(error => {
      console.error("Error during API call:", error);
      alert("Erro ao atualizar a senha do certificado. Verifique o console para mais detalhes.");
    });
  };

  const toggleShowPassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  const handleKeyDownPasswordInput = (event) => {
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
                <div>
                  <strong>Pasta de Entrada:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-entrada" value={formData["pasta-entrada"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Pasta Processo Email:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-proc-mail" value={formData["pasta-proc-mail"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Pasta Processo DFE:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-proc-dfe" value={formData["pasta-proc-dfe"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Pasta de Erros:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-erros" value={formData["pasta-erros"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Armazenagem do XML:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faWarehouse} className="icon" />
                    <select name="cd-armazena" value={formData["cd-armazena"] || ''} onChange={handleChange} onKeyDown={handleKeyDown}>
                      <option value={1}>Não Armazena</option>
                      <option value={2}>Armazena em Pasta Física</option>
                      <option value={3}>Armazena em Banco de Dados</option>
                    </select>
                  </div>
                </div>
                <div>
                  <strong>Habilita Pasta Log:</strong>
                  <input type="checkbox" name="l-pasta-log" checked={formData["l-pasta-log"] || false} onChange={handleChange} onKeyDown={handleKeyDown} />
                </div>
                <div>
                  <strong>Pasta de Armazenagem:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-armaz" value={formData["pasta-armaz"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Pasta de Gravação do Log:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-grava-log" value={formData["pasta-grava-log"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
              </div>
            )}
            {tab === "traducao" && (
              <div className="quadrante-editempresatraducao">
                <div>
                  <strong>Utiliza Item Cliente/Fornecedor:</strong>
                  <input type="checkbox" name="l-item-fornec" checked={formData["l-item-fornec"] || false} onChange={handleChange} />
                </div>
                <div>
                  <strong>Utiliza FIFO Ordem de Compra:</strong>
                  <input type="checkbox" name="l-fifo-ordem-compra" checked={formData["l-fifo-ordem-compra"] || false} onChange={handleChange} />
                </div>
                <div>
                  <strong>Importa Observação XML:</strong>
                  <input type="checkbox" name="l-observacao" checked={formData["l-observacao"] || false} onChange={handleChange} />
                </div>
                <div>
                  <strong>Envia E-mail Eventos:</strong>
                  <input type="checkbox" name="l-email-eventos" checked={formData["l-email-eventos"] || false} onChange={handleChange} />
                </div>
                <div>
                  <strong>Mantém Impostos do XML na Capa:</strong>
                  <input type="checkbox" name="l-impostos-capa" checked={formData["l-impostos-capa"] || false} onChange={handleChange} />
                </div>
                <div>
                  <strong>Zera Valor IPI Outros:</strong>
                  <input type="checkbox" name="l-zera-ipi-outros" checked={formData["l-zera-ipi-outros"] || false} onChange={handleChange} />
                </div>
                <div>
                  <strong>Prioriza Documentos:</strong>
                  <input type="checkbox" name="l-prioriza-documento" checked={formData["l-prioriza-documento"] || false} onChange={handleChange} />
                </div>
                <div>
                  <strong>Informa Conta/CCusto Manual Item:</strong>
                  <input type="checkbox" name="l-conta-ccusto-manual" checked={formData["l-conta-ccusto-manual"] || false} onChange={handleChange} />
                </div>
                <div>
                  <strong>Usa Tag Ordem Compra:</strong>
                  <input type="checkbox" name="l-usa-tag-compra" checked={formData["l-usa-tag-compra"] || false} onChange={handleChange} />
                </div>
                <div>
                  <strong>Usa NCM Fornecedor:</strong>
                  <input type="checkbox" name="log-ncm-fornec" checked={formData["log-ncm-fornec"] || false} onChange={handleChange} />
                </div>
                <div>
                  <strong>Altera NCM do item:</strong>
                  <input type="checkbox" name="log-altera-ncm" checked={formData["log-altera-ncm"] || false} onChange={handleChange} />
                </div>
                <div>
                  <strong>Quantidade Manual:</strong>
                  <input type="checkbox" name="log-qt-manual" checked={formData["log-qt-manual"] || false} onChange={handleChange} />
                </div>
                <div>
                  <strong>Usa CST Fornecedor:</strong>
                  <input type="checkbox" name="log-cst-fornec" checked={formData["log-cst-fornec"] || false} onChange={handleChange} />
                </div>
                <div>
                  <strong>Usa Duplicata Documento XML:</strong>
                  <input type="checkbox" name="l-duplic-docum" checked={formData["l-duplic-docum"] || false} onChange={handleChange} />
                </div>
                <div>
                  <strong>Altera EAN/GTIN do item:</strong>
                  <input type="checkbox" name="log-altera-ean-gtin" checked={formData["log-altera-ean-gtin"] || false} onChange={handleChange} />
                </div>
                <div>
                  <strong>Grava Pesos Recebimento Físico:</strong>
                  <input type="checkbox" name="l-peso-doc-fisico" checked={formData["l-peso-doc-fisico"] || false} onChange={handleChange} />
                </div>
                <div>
                  <strong>Bloqueia Lançamento sem Confirmação:</strong>
                  <input type="checkbox" name="l-bloqueia-sem-confirmacao" checked={formData["l-bloqueia-sem-confirmacao"] || false} onChange={handleChange} />
                </div>
                <div>
                  <strong>Bloqueia UN Divergente:</strong>
                  <input type="checkbox" name="log-bloq-un-divergente" checked={formData["log-bloq-un-divergente"] || false} onChange={handleChange} />
                </div>
                <div>
                  <strong>Bloqueia OP Finalizada/Terminada:</strong>
                  <input type="checkbox" name="l-bloqueia-op-finaliz" checked={formData["l-bloqueia-op-finaliz"] || false} onChange={handleChange} />
                </div>
                <div>
                  <strong>Bloqueia NCM Divergente:</strong>
                  <input type="checkbox" name="log-bloqueio-ncm-diverg" checked={formData["log-bloqueio-ncm-diverg"] || false} onChange={handleChange} />
                </div>
                <div className="flex-break">
                  <strong>Bloqueia Divergência de Valor na Ordem de Compra:</strong>
                  <input type="checkbox" name="l-bloq-var-valor" checked={formData["l-bloq-var-valor"] || false} onChange={handleChange} />
                </div>
                <div className="flex-break">
                  <strong>Bloqueia Divergência de Quantidade na Ordem de Compra:</strong>
                  <input type="checkbox" name="l-bloq-var-quant" checked={formData["l-bloq-var-quant"] || false} onChange={handleChange} />
                </div>
                <div>
                  <strong>Bloqueia Estabelecimento OC Divergente:</strong>
                  <input type="checkbox" name="l-bloq-estab-diveg" checked={formData["l-bloq-estab-diveg"] || false} onChange={handleChange} />
                </div>
                <div>
                  <strong>Usa NCM Fornecedor em Débito Direto:</strong>
                  <input type="checkbox" name="l-subst-ncm-dd" checked={formData["l-subst-ncm-dd"] || false} onChange={handleChange} />
                </div>
                <div>
                  <strong>Contingência para Download do XML:</strong>
                  <input type="checkbox" name="l-contingencia-download-xml" checked={formData["l-contingencia-download-xml"] || false} onChange={handleChange} />
                </div>
              </div>
            )}
            {tab === "traducaoB" && (
              <div className="quadrante-editempresa">
                <div>
                  <strong>Devolução Nota Própria:</strong>
                  <input type="checkbox" name="log-depos-devol" checked={formData["log-depos-devol"] || false} onChange={handleChange} onKeyDown={handleKeyDown} />
                </div>
                <div>
                  <strong>Depósito Devolução:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faUndoAlt} className="icon" />
                    <input type="text" name="cod-depos-dev" value={formData["cod-depos-dev"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Localização Devolução:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                    <input type="text" name="cod-localiz-dev" value={formData["cod-localiz-dev"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Informações Lote Automática:</strong>
                  <input type="checkbox" name="l-fixa-lote" checked={formData["l-fixa-lote"] || false} onChange={handleChange} onKeyDown={handleKeyDown} />
                </div>
                <div>
                  <strong>Lote Fixo:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faBox} className="icon" />
                    <input type="text" name="lote" value={formData["lote"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Data de Validade:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                    <input type="date" name="dt-valid-lote" value={formData["dt-valid-lote"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Copia CT-e para GFE:</strong>
                  <input type="checkbox" name="l-copia-gfe" checked={formData["l-copia-gfe"] || false} onChange={handleChange} onKeyDown={handleKeyDown} />
                </div>
                <div>
                  <strong>Pasta Cópia GFE:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-gfe" value={formData["pasta-gfe"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Anexos Divergência:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faPaperclip} className="icon" />
                    <input type="text" name="pasta-anexo-diverg" value={formData["pasta-anexo-diverg"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
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
                    <input type="text" name="servidor-email" value={formData["servidor-email"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>E-mail NFe:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFileInvoice} className="icon-left" />
                    <input
                      type="text"
                      name="e-mail-nfe"
                      value={formData["e-mail-nfe"] || ""}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                    />
                   <Tooltip.Provider>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <FontAwesomeIcon
                            icon={faLock}
                            name="senha-email"
                            className="icon-right"
                            value={formData["senha-email"] || ''}
                            onClick={handlePasswordModalOpen}
                          />
                        </Tooltip.Trigger>
                        <Tooltip.Content className="radix-tooltip-content" side="top" align="center">
                          Alterar Senha
                          <Tooltip.Arrow className="radix-tooltip-arrow" />
                        </Tooltip.Content>
                      </Tooltip.Root>
                    </Tooltip.Provider>

                  </div>
                </div>
                <div>
                  <strong>Tipo Conexão:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faNetworkWired} className="icon" />
                    <select name="tipo-conexao-mail" value={formData["tipo-conexao-mail"] || ''} onChange={handleChange} onKeyDown={handleKeyDown}>
                      <option value="1">Segura</option>
                      <option value="2">Não Segura</option>
                    </select>
                  </div>
                </div>
                <div>
                  <strong>Cliente ID:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faTag} className="icon" />
                    <input type="text" name="client-id" value={formData["client-id"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Tenant ID:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faTag} className="icon" />
                    <input type="text" name="tenant-id" value={formData["tenant-id"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Ambiente SEFAZ:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faGlobe} className="icon" />
                    <input type="text" name="ambiente-sefaz" value={formData["ambiente-sefaz"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Ambiente Destinada:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faGlobe} className="icon" />
                    <input type="text" name="ambiente-destinadas" value={formData["ambiente-destinadas"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Tipo Certificado:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faCertificate} className="icon" />
                    <select name="tipo-certificado" value={formData["tipo-certificado"] || ''} onChange={handleChange} onKeyDown={handleKeyDown}>
                      <option value="A1">A1</option>
                      <option value="A3">A3</option>
                    </select>
                  </div>
                </div>
                <div>
                  <strong>Arquivo Certificado:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFile} className="icon-left" />
                    <input
                      type="password"
                      name="arquivo-certificado"
                      value={formData["arquivo-certificado"] || ''}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                    />
                    <FontAwesomeIcon icon={faEyeSlash} className="icon-editeye" />
                    <Tooltip.Provider>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <FontAwesomeIcon
                            icon={faLock}
                            name="senha-certificado"
                            className="icon-right"
                            value={formData["senha-certificado"] || ''}
                            onClick={handleCertPasswordModalOpen}
                          />
                        </Tooltip.Trigger>
                        <Tooltip.Content className="radix-tooltip-content" side="top" align="center">
                          Alterar Senha do Certificado
                          <Tooltip.Arrow className="radix-tooltip-arrow" />
                        </Tooltip.Content>
                      </Tooltip.Root>
                    </Tooltip.Provider>
                  </div>
                </div>
                <div>
                  <strong>Pasta Arq Configuração:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFile} className="icon" />
                    <input type="text" name="pasta-arq-config" value={formData["pasta-arq-config"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Nome Arq Config:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFile} className="icon" />
                    <input type="text" name="nome-arq-config" value={formData["nome-arq-config"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div className="proxy-edit">
                  <strong>Utiliza Proxy:</strong>
                  <input type="checkbox" name="l-utiliza-proxy" checked={formData["l-utiliza-proxy"] || false} onChange={handleChange} onKeyDown={handleKeyDown} />
                </div>
                <div>
                  <strong>Servidor Proxy:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faServer} className="icon" />
                    <input type="text" name="servidor-proxy" value={formData["servidor-proxy"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Porta:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faDoorClosed} className="icon" />
                    <input type="number" name="porta-proxy" value={formData["porta-proxy"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Usuário Proxy:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <input type="text" name="usuario-proxy" value={formData["usuario-proxy"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Senha Proxy:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faLock} className="icon" />
                    <input type="password" name="senha-proxy" value={formData["senha-proxy"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
              </div>
            )}
            {tab === "servidor" && (
              <div className="quadrante-editempresa">
                <div>
                  <strong>Usa Linux RPW:</strong>
                  <input type="checkbox" name="l-usa-linux-rpw" checked={formData["l-usa-linux-rpw"] || false} onChange={handleChange} onKeyDown={handleKeyDown} />
                </div>
                <div>
                  <strong>Arquivo Certificado Linux:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFile} className="icon" />
                    <input type="text" name="cod-arq-certificado-lnx" value={formData["cod-arq-certificado-lnx"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Nome Arquivo Configuração Linux:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFile} className="icon" />
                    <input type="text" name="nome-arq-config-lnx" value={formData["nome-arq-config-lnx"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Pasta Arquivo Configuração Linux:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-arq-config-lnx" value={formData["pasta-arq-config-lnx"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Pasta de Entrada Linux:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-entrada-lnx" value={formData["pasta-entrada-lnx"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Pasta Processo E-mail Linux:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-proc-mail-lnx" value={formData["pasta-proc-mail-lnx"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Pasta Processo DFE Linux:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-proc-dfe-lnx" value={formData["pasta-proc-dfe-lnx"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Pasta de Erros Linux:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-erros-lnx" value={formData["pasta-erros-lnx"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
                <div>
                  <strong>Pasta de Log Linux:</strong>
                  <div className="input-containeredit">
                    <FontAwesomeIcon icon={faFolder} className="icon" />
                    <input type="text" name="pasta-grava-log-linux" value={formData["pasta-grava-log-linux"] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                  </div>
                </div>
              </div>
            )}
          </div>
          <button type="submit" className="button-primary-editempresa">Salvar Alterações</button>
          <button type="button" onClick={onClose} className="button-secondary-editempresa">Cancelar</button>
        </form>
      </div>
      {isPasswordModalOpen && (
        <div className="modal-backdrop-alterar-senha" onClick={handlePasswordModalClose}>
          <div className="modal-content-alterar-senha" onClick={(e) => e.stopPropagation()}>
            <h2>Alterar Senha</h2>
            <form onSubmit={handlePasswordChange}>
              <div>
                <label>Nova Senha:</label>
                <div className="password-input-container">
                  <input
                    className="input-alterar-senha"
                    type={showPassword.newPassword ? "text" : "password"}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordInputChange}
                    onKeyDown={handleKeyDownPasswordInput}
                  />
                  <FontAwesomeIcon
                    icon={showPassword.newPassword ? faEyeSlash : faEye}
                    className="password-toggle-icon"
                    onClick={() => toggleShowPassword("newPassword")}
                  />
                </div>
              </div>
              <div>
                <label>Confirmar Nova Senha:</label>
                <div className="password-input-container">
                  <input
                    className="input-alterar-senha"
                    type={showPassword.confirmNewPassword ? "text" : "password"}
                    name="confirmNewPassword"
                    value={passwordData.confirmNewPassword}
                    onChange={handlePasswordInputChange}
                    onKeyDown={handleKeyDownPasswordInput}
                  />
                  <FontAwesomeIcon
                    icon={showPassword.confirmNewPassword ? faEyeSlash : faEye}
                    className="password-toggle-icon"
                    onClick={() => toggleShowPassword("confirmNewPassword")}
                  />
                </div>
              </div>
              <button className="submit-alterar-senha" type="submit">Alterar</button>
              <button className="button-alterar-senha" type="button" onClick={handlePasswordModalClose}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
      {isCertPasswordModalOpen && (
        <div className="modal-backdrop-alterar-senha" onClick={handleCertPasswordModalClose}>
          <div className="modal-content-alterar-senha" onClick={(e) => e.stopPropagation()}>
            <h2>Alterar Senha</h2>
            <form onSubmit={handleCertPasswordChange}>
              <div>
                <label>Nova Senha:</label>
                <div className="password-input-container">
                  <input
                    className="input-alterar-senha"
                    type={showPassword.newPassword ? "text" : "password"}
                    name="newPassword"
                    value={certPasswordData.newPassword}
                    onChange={handleCertPasswordInputChange}
                    onKeyDown={handleKeyDownPasswordInput}
                  />
                  <FontAwesomeIcon
                    icon={showPassword.newPassword ? faEyeSlash : faEye}
                    className="password-toggle-icon"
                    onClick={() => toggleShowPassword("newPassword")}
                  />
                </div>
              </div>
              <div>
                <label>Confirmar Nova Senha:</label>
                <div className="password-input-container">
                  <input
                    className="input-alterar-senha"
                    type={showPassword.confirmNewPassword ? "text" : "password"}
                    name="confirmNewPassword"
                    value={certPasswordData.confirmNewPassword}
                    onChange={handleCertPasswordInputChange}
                    onKeyDown={handleKeyDownPasswordInput}
                  />
                  <FontAwesomeIcon
                    icon={showPassword.confirmNewPassword ? faEyeSlash : faEye}
                    className="password-toggle-icon"
                    onClick={() => toggleShowPassword("confirmNewPassword")}
                  />
                </div>
              </div>
              <button className="submit-alterar-senha" type="submit">Alterar</button>
              <button className="button-alterar-senha" type="button" onClick={handleCertPasswordModalClose}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EditEmpresaModal;
