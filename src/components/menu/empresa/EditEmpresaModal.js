import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./styleEditEmpresaModal.css";

function EditEmpresaModal({ isOpen, onClose, empresa, onSave }) {
  const [formData, setFormData] = useState({
    "cod-estabel": "",
    cgc: "",
    "ins-municipal": "",
    "inscr-estad": "",
    "razao-social": ""
  });

  useEffect(() => {
    if (empresa) {
      setFormData({
        "cod-estabel": empresa["cod-estabel"] || "",
        cgc: empresa.cgc || "",
        "ins-municipal": empresa["ins-municipal"] || "",
        "inscr-estad": empresa["inscr-estad"] || "",
        "razao-social": empresa["razao-social"] || ""
      });
    }
  }, [empresa]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Editar Empresa" className="modal-content-editcompany" overlayClassName="modal-backdrop-editcompany" ariaHideApp={false}>
      <h2 className="title-editcompany">Editar Empresa</h2>
      <form onSubmit={handleSubmit} className="modal-body-editcompany">
        <div className="input-group">
          <label>Código Estabelecimento:</label>
          <input
            type="text"
            name="cod-estabel"
            value={formData['cod-estabel']}
            onChange={handleChange}
            readOnly
            className="form-control"
          />
        </div>
        <div className="input-group">
          <label>CGC:</label>
          <input
            type="text"
            name="cgc"
            value={formData.cgc}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="input-group">
          <label>Inscrição Municipal:</label>
          <input
            type="text"
            name="ins-municipal"
            value={formData['ins-municipal']}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="input-group">
          <label>Inscrição Estadual:</label>
          <input
            type="text"
            name="inscr-estad"
            value={formData['inscr-estad']}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="input-group">
          <label>Razão Social:</label>
          <input
            type="text"
            name="razao-social"
            value={formData['razao-social']}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="modal-footer-editcompany">
          <button type="submit" className="button-primary-editcompany">Salvar Alterações</button>
          <button type="button" onClick={onClose} className="button-secondary-editcompany">Cancelar</button>
        </div>
      </form>
    </Modal>
  );
}

export default EditEmpresaModal;
