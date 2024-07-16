import React, { useState } from "react";
import "./styleModalVisualizar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import AuditoriaModal from "./AuditoriaModal";

function ToggleButton({ defaultChecked, onToggle }) {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onToggle(newState);
  };

  return (
    <div className="toggle-container">
      <button className="toggle-button" onClick={handleToggle} disabled={true}>
        <FontAwesomeIcon
          icon={isChecked ? faToggleOn : faToggleOff}
          size="2x"
        />
      </button>
    </div>
  );
}

function VisualizarModal({ isOpen, onClose, user }) {
  const [auditoriaModalOpen, setAuditoriaModalOpen] = useState(user["log-auditoria"]);

  if (!isOpen || !user) return null;

  const handleToggleActive = (isActive) => {
    console.log(`O usuário está ${isActive ? "ativo" : "inativo"}`);
  };

  const handleToggleAuditoria = (isActive) => {
    setAuditoriaModalOpen(isActive);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop-user" onClick={handleBackdropClick}>
      <div className="modal-content-usuario">
        <div className="modal-header">
          <h2 className="title-user">Visualizar Usuário</h2>
          <button
            type="button"
            className="close-button-usuario"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="modal-body-user">
          <p>
            Usuário: <span className="user-view">{user["cod-usuario"]}</span>
          </p>
          <p>
            Estabelecimento:{" "}
            <span className="user-view">{user["cod-estabel"]}</span>
          </p>
        </div>
        <div className="quadrante-visualizar">
          {[
            ["l-importa", "Importa XML"],
            ["l-exporta", "Exporta XML"],
            ["l-manifesta", "Manifesta Documento"],
            ["l-nota-servico", "Visualiza NFS-e"],
            ["l-elimina", "Elimina XML"],
            ["l-atualiza", "Atualiza XML"],
            ["l-prioriza-documento", "Prioriza/Confirma Documento"],
            ["l-cancela-doc", "Cancela Documento"],
            ["l-efetua-download", "Efetua Download"],
            ["l-recebe-fiscal", "Recebimento Fiscal (RE1001)"],
            ["l-altera-cfop", "Altera CFOP"],
            ["l-arquiva-xml", "Arquiva XML Manualmente"],
            ["l-recebe-fisico", "Recebimento Físico (RE2001)"],
          ].map(([key, label]) => (
            <div key={key} className="button-title-user">
              <ToggleButton
                defaultChecked={user[key]}
                onToggle={handleToggleActive}
              />
              <span className="toggle-text">{label}</span>
            </div>
          ))}
          <div className="button-title-user">
            <ToggleButton
              defaultChecked={user["log-auditoria"]}
              onToggle={handleToggleAuditoria}
            />
            <span className="toggle-text">Acesso a Auditoria</span>
          </div>
        </div>
        {auditoriaModalOpen && (
          <AuditoriaModal onClose={() => setAuditoriaModalOpen(false)} user={user} />
        )}
      </div>
    </div>
  );
}

export default VisualizarModal;
