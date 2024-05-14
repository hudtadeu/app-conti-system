import React from "react";
import "./styleAuditoriaModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";

const AuditoriaModal = ({ onClose, user }) => {
  return (
    <div className="modal-backdrop-audit">
      <div className="modal-audit-usuario">
        <div className="modal-audit-user">
          <h2 className="title-audit">
            Acesso a Auditoria
            <button onClick={onClose} className="close-button-audit">
              &times;
            </button>
          </h2>
          <div className="quadrante-title-audit">
            <p>
              Usuário: <span class="user-audit">{user["cod-usuario"]}</span>
            </p>
            <p>
              Estabelecimento:{" "}
              <span class="user-audit">{user["cod-estabel"]}</span>
            </p>
          </div>
          <div className="quadrante-title-audit">
            <h4 className="painel-title-audit">Acesso ao Painel</h4>
            <div className="audit-container">
            <span className="subtitle-audit">
              <button className="toggle-button-audit">
                <FontAwesomeIcon
                  icon={user["l-audit-portaria"] ? faToggleOn : faToggleOff}
                />
              </button>
              Portaria{" "}
            </span>
            <span className="subtitle-audit">
              <button className="toggle-button-audit">
                <FontAwesomeIcon
                  icon={user["l-audit-almox"] ? faToggleOn : faToggleOff}
                />
              </button>
              Almoxarifado{" "}
            </span>
            <span className="subtitle-audit">
              <button className="toggle-button-audit">
                <FontAwesomeIcon
                  icon={user["l-audit-suprimentos"] ? faToggleOn : faToggleOff}
                />
              </button>
              Suprimentos{" "}
            </span>
            <span className="subtitle-audit">
              <button className="toggle-button-audit">
                <FontAwesomeIcon
                  icon={user["l-audit-fiscal"] ? faToggleOn : faToggleOff}
                />
              </button>
              Fiscal{" "}
            </span>
          </div>
          </div>
        </div>
      </div>
      <div className="modal-footer"></div>
    </div>
  );
};

export default AuditoriaModal;
