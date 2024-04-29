import React from "react";

const AuditoriaModal = ({ onClose }) => {
  return (
    <div className="modal-backdrop-audit">
      <div className="modal-audit-usuario">
        <div className="modal-audit-user">
          <h2 className="title-audit">
            Detalhes da Auditoria
            <button onClick={onClose} className="close-button-audit">
              &times;
            </button>
          </h2>
        </div>
      </div>
      <div className="modal-footer"></div>
    </div>
  );
};

export default AuditoriaModal;
