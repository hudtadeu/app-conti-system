import React from 'react';

function DetalhesConsultarDocumentos({ documento, getStatusInfo }) {
  return (
    <div className="selected-documento-details">
      <h2>Detalhes do Documento Selecionado</h2>
      <p>Fornecedor: {documento.fornecedor}</p>
      <p>Documento: {documento.documento}</p>
      <p>Série: {documento.serie}</p>
      <p>Natureza de Operação: {documento.natureza_operacao}</p>
      <p>Data de Emissão: {documento.data_emissao}</p>
      <p>Status: {getStatusInfo(documento.status).text}</p>
    </div>
  );
}

export default DetalhesConsultarDocumentos;
