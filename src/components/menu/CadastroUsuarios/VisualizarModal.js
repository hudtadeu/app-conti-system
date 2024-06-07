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
  const [auditoriaModalOpen, setAuditoriaModalOpen] = useState(false);
  if (!isOpen || !user) return null;

  const handleToggleActive = (isActive) => {
    console.log(`O usuário está ${isActive ? "ativo" : "inativo"}`);
  };

  const toggleAuditoriaModal = () => {
    setAuditoriaModalOpen(!auditoriaModalOpen);
  };

  return (
    <div className="modal-backdrop-user">
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
            <div className="button-title-user">
              {" "}
              <ToggleButton
                defaultChecked={user["l-importa"]}
                onToggle={handleToggleActive}
              />{" "}
              <span className="toggle-text">Importa XML</span>
            </div>
            <div className="button-title-user">
              {" "}
              <ToggleButton
                defaultChecked={user["l-exporta"]}
                onToggle={handleToggleActive}
              />{" "}
              <span className="toggle-text">Exporta XML</span>
            </div>
            <div className="button-title-user">
              {" "}
              <ToggleButton
                defaultChecked={user["l-manifesta"]}
                onToggle={handleToggleActive}
              />{" "}
              <span className="toggle-text">Manifesta Documento</span>
            </div>
            <div className="button-title-user">
              {" "}
              <ToggleButton
                defaultChecked={user["l-nota-servico"]}
                onToggle={handleToggleActive}
              />{" "}
              <span className="toggle-text">Visualiza NFS-e</span>
            </div>
            <div className="button-title-user">
              {" "}
              <ToggleButton
                defaultChecked={user["l-elimina"]}
                onToggle={handleToggleActive}
              />{" "}
              <span className="toggle-text">Elimina XML</span>
            </div>
            <div className="button-title-user">
              {" "}
              <ToggleButton
                defaultChecked={user["l-atualiza"]}
                onToggle={handleToggleActive}
              />{" "}
              <span className="toggle-text">Atualiza XML</span>
            </div>
            <div className="button-title-user">
              {" "}
              <ToggleButton
                defaultChecked={user["l-prioriza-documento"]}
                onToggle={handleToggleActive}
              />{" "}
              <span className="toggle-text">Prioriza/Confirma Documento</span>
            </div>
            <div className="button-title-user">
              {" "}
              <ToggleButton
                defaultChecked={user["l-cancela-doc"]}
                onToggle={handleToggleActive}
              />{" "}
              <span className="toggle-text">Cancela Documento</span>
            </div>
            <div className="button-title-user">
              {" "}
              <ToggleButton
                defaultChecked={user["l-efetua-download"]}
                onToggle={handleToggleActive}
              />{" "}
              <span className="toggle-text">Efetua Download</span>
            </div>
            <div className="button-title-user">
              {" "}
              <ToggleButton
                defaultChecked={user["l-recebe-fiscal"]}
                onToggle={handleToggleActive}
              />{" "}
              <span className="toggle-text">Recebimento Fiscal (RE1001)</span>
            </div>
            <div className="button-title-user">
              {" "}
              <ToggleButton
                defaultChecked={user["l-altera-cfop"]}
                onToggle={handleToggleActive}
              />{" "}
              <span className="toggle-text">Altera CFOP</span>
            </div>
            <div className="button-title-user">
              {" "}
              <ToggleButton
                defaultChecked={user["l-arquiva-xml"]}
                onToggle={handleToggleActive}
              />{" "}
              <span className="toggle-text">Arquiva XML Manualmente</span>
            </div>
            <div className="button-title-user">
              {" "}
              <ToggleButton
                defaultChecked={user["l-recebe-fisico"]}
                onToggle={handleToggleActive}
              />{" "}
              <span className="toggle-text">Recebimento Físico (RE2001)</span>
            </div>
            <div className="button-title-user">
              <ToggleButton
                defaultChecked={user["log-auditoria"
                  
                ]}
                onToggle={handleToggleActive}
              />{" "}
              <button
                className="button-audit-user"
                onClick={toggleAuditoriaModal}
              >
                Acesso a Auditoria
              </button>
            </div>
          </div>
          {auditoriaModalOpen && (
            <AuditoriaModal onClose={toggleAuditoriaModal} user={user} />
          )}
        </div>
      </div>
  );
}

export default VisualizarModal;
