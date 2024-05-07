import React, { useState, useEffect, useRef } from "react";
import ToggleButton from "./ToggleButton";
import "./styleNewUserModal.css"

function NewUserModal({ toggleModal, addNewUser }) {
  const [base64Credentials, setBase64Credentials] = useState("");
  const [user, setUser] = useState({
    "cod-usuario": "",
    "cod-estabel": "",
    "l-importa": false,
    "l-exporta": false,
    "l-manifesta": false,
    "l-nota-servico": false,
    "l-elimina": false,
    "l-atualiza": false,
    "l-prioriza-documento": false,
    "l-cancela-doc": false,
    "l-efetua-download": false,
    "l-recebe-fiscal": false,
    "l-altera-cfop": false,
    "l-arquiva-xml": false,
    "l-recebe-fisico": false,
    "log-auditoria": false,
  });

  useEffect(() => {
    const credentials = sessionStorage.getItem("token");
    if (!credentials) {
      console.error("Base64 credentials not found in sessionStorage");
      return;
    }
    setBase64Credentials(credentials);
  }, []);

  const refs = {
    "cod-usuario": useRef(),
    "cod-estabel": useRef(),
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleToggleChange = (name, newValue) => {
    setUser({ ...user, [name]: newValue });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        "http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/boRequestUsuarioLoader",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${base64Credentials}`,
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao criar usuário");
      }

      addNewUser(user);
      toggleModal();
      setUser({
        "cod-usuario": "",
        "cod-estabel": "",
        "l-importa": false,
        "l-exporta": false,
        "l-manifesta": false,
        "l-nota-servico": false,
        "l-elimina": false,
        "l-atualiza": false,
        "l-prioriza-documento": false,
        "l-cancela-doc": false,
        "l-efetua-download": false,
        "l-recebe-fiscal": false,
        "l-altera-cfop": false,
        "l-arquiva-xml": false,
        "l-recebe-fisico": false,
        "log-auditoria": false,
      });
    } catch (error) {
      console.error("Erro ao salvar novo usuário:", error);
    }
  };

  const handleFormKeyDown = (e, nextInputRef) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      if (nextInputRef) {
        nextInputRef.current.focus(); 
      }
    }
  };

  return (
    <div className="modal-backdrop-newuser">
      <div className="modal-content-newuser">
        <div className="modal-newuser">
          <h2 className="title-newuser">Novo Usuário</h2>
          <button
            type="button"
            className="close-button-newuser"
            onClick={toggleModal}
          >
            &times;
          </button>
        </div>
        <div className="modal-body-usernew">
          <form onKeyDown={handleFormKeyDown}>
            <div className="modal-body-newuser">
              <div>
                Usuário:{" "}
                <input
                  type="text"
                  name="cod-usuario"
                  value={user["cod-usuario"]}
                  onChange={handleInputChange}
                  ref={refs["cod-usuario"]}
                  onKeyDown={(e) => handleFormKeyDown(e, refs["cod-estabel"])}
                  className="newuser-view"
                />
              </div>
              <div>
                Estabelecimento:{" "}
                <input
                  type="text"
                  name="cod-estabel"
                  value={user["cod-estabel"]}
                  onChange={handleInputChange}
                  ref={refs["cod-estabel"]}
                  onKeyDown={(e) => handleFormKeyDown(e, null)}
                  className="newuser-view"
                />
              </div>
            </div>
            <div className="quadrante-newuser">
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
                    defaultChecked={user[key]}
                    onToggle={(newValue) => handleToggleChange(key, newValue)}
                  />
                  <span className="toggle-text">{label}</span>
                </div>
              ))}
            </div>
          </form>
        </div>
        <div className="modal-footer-newuser">
          <button
            type="button"
            className="button-secondary-newuser"
            onClick={toggleModal}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="button-primary-newuser"
            onClick={handleSave}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewUserModal;
