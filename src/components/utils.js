// utils.js
export const getStatusInfo = (situacao) => {
    let statusText;
    let statusColor;
    switch (situacao) {
      case 'Pendente':
        statusText = 'Pendente';
        statusColor = '#FFD700';
        break;
      case 'Atualizado':
        statusText = 'Atualizado';
        statusColor = '#008000';
        break;
      case 'Cancelado':
        statusText = 'Cancelado';
        statusColor = '#FF0000';
        break;
      default:
        statusText = 'Status Desconhecido';
        statusColor = '#808080';
        break;
    }
    return { text: statusText, color: statusColor };
  };
  
  export const getTipoDocumentoInfo = (tipoDoc) => {
    let tipoText;
    let tipoColor;
    switch (tipoDoc) {
      case 'NF-e':
        tipoText = 'NF-e';
        tipoColor = '#32CD32';
        break;
      case 'CT-e':
        tipoText = 'CT-e';
        tipoColor = '#00BFFF';
        break;
      case 'CTe-OS':
        tipoText = 'CTe-OS';
        tipoColor = '#8A2BE2';
        break;
      case 'NFS-e':
        tipoText = 'NFS-e';
        tipoColor = '#FF8C00';
        break;
      case 'NF3e':
        tipoText = 'NF3e';
        tipoColor = '#FF1493';
        break;
      default:
        tipoText = 'Diversos';
        tipoColor = '#808080';
        break;
    }
    return { text: tipoText, color: tipoColor };
  };
  