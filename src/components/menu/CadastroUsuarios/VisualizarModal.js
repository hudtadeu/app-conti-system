import React from "react";
import "./styleModalVisualizar.css";

function VisualizarModal({ isOpen, onClose, user }) {
  if (!isOpen || !user) return null;

  return (
    <div className="modal-backdrop-user">
      <div className="modal-usuario">
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
            <p>Usuário: {user["cod-usuario"]}</p>
            <p>Código: {user["cod-estabel"]}</p>
            <p>Nome: {user["nome"]}</p>
            <p>Razão Social: {user["razao-social"]}</p>
            {/* Adicione mais detalhes conforme necessário */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisualizarModal;
