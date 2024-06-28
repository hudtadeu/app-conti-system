import React, { useState } from "react";
import ToggleButton from "./ToggleButton";
import "./styleEditUserModal.css";

function EditUserModal({ isOpen, onClose, user, updateUser }) {
  const [editableUser, setEditableUser] = useState(user);

  const handleToggleChange = (name, newValue) => {
    setEditableUser({ ...editableUser, [name]: newValue });
  };

  const handleSave = () => {
    updateUser(editableUser);
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop-edituser" onClick={handleBackdropClick}>
      <div className="modal-content-edituser">
        <div className="modal-edituser">
          <h2 className="title-edituser">Editar Usuário</h2>
          <button
            type="button"
            className="close-button-edituser"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div>
          <form>
            <div className="modal-body-edituser">
              <div>
                Usuário:{" "}
                <input
                  type="text"
                  name="cod-usuario"
                  value={editableUser["cod-usuario"]}
                  readOnly
                  className="edituser-view"
                />
              </div>
              <div>
                Estabelecimento:{" "}
                <input
                  type="text"
                  name="cod-estabel"
                  value={editableUser["cod-estabel"]}
                  readOnly
                  className="edituser-view"
                />
              </div>
            </div>
            <div className="quadrante-edituser">
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
                ["log-auditoria", "Auditoria"],
              ].map(([key, label]) => (
                <div key={key} className="button-title-newuser">
                  <ToggleButton
                    defaultChecked={editableUser[key]}
                    onToggle={(newValue) => handleToggleChange(key, newValue)}
                  />
                  <span className="toggle-text">{label}</span>
                </div>
              ))}
            </div>
          </form>
        </div>
        <div className="modal-footer-edituser">
          <button
            type="button"
            className="button-primary-edituser"
            onClick={handleSave}
          >
            Salvar Alterações
          </button>
          <button
            type="button"
            className="button-secondary-edituser"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditUserModal;
