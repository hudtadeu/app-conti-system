// ViewUserModal.js
import React from "react";

function ViewUserModal({ user, toggleModal }) {
  if (!user) return null;

  return (
    <div className="modal-usuario">
      <div className="modal-content-usuario">
        <div className="modal-header">
          <h5 className="modal-title">Detalhes do Usuário</h5>
          <button
            type="button"
            className="close-button-usuario"
            onClick={toggleModal}
          >
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>
            <strong>Usuário:</strong> {user["cod-usuario"]}
          </p>
          <p>
            <strong>Estabelecimento:</strong> {user["cod-estabel"]}
          </p>
          {/* Adicione mais campos conforme necessário */}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="button-secondary-user"
            onClick={toggleModal}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewUserModal;
