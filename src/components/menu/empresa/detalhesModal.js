import React from "react";
import Modal from "./modalEmpresa";

const DetalhesModal = ({ isOpen, empresa, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {empresa ? (
        <div>
          <h3>Detalhes da Empresa</h3>
          <p>
            <strong>Código:</strong> {empresa.codEstabel}
          </p>
          <p>
            <strong>CGC:</strong> {empresa.cgc}
          </p>
          <p>
            <strong>Inscrição Municipal:</strong> {empresa.insMunicipal}
          </p>
          <p>
            <strong>Inscrição Estadual:</strong> {empresa.inscrEstad}
          </p>
          <p>
            <strong>Razão Social:</strong> {empresa.razaoSocial}
          </p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </Modal>
  );
};

export default DetalhesModal;
