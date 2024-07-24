import React, { useEffect, useState } from "react";
import "./styleEmpresa.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencilAlt,
  faTrash,
  faSearch,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import DetalhesModal from "./detalhesModal";
import EditEmpresaModal from "./EditEmpresaModal";
import NovaEmpresaModal from "./NovaEmpresaModal";

function Empresa() {
  const [empresas, setEmpresas] = useState([]);
  const [empresasFiltradas, setEmpresasFiltradas] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [empresaDetalhes, setEmpresaDetalhes] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [empresaEditando, setEmpresaEditando] = useState(null);
  const [novaEmpresaModalOpen, setNovaEmpresaModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [overlayVisible, setOverlayVisible] = useState(false);
  const apiUrl =
    "http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/boRequestEmpresa";

  useEffect(() => {
    const base64Credentials = sessionStorage.getItem("token");

    if (!base64Credentials) {
      console.error("base64Credentials não encontrado na sessionStorage");
      setLoading(false); // Defina como falso se houver um erro
      return;
    }

    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao solicitar os dados da API");
        }
        return response.json();
      })
      .then((data) => {
        if (data.items && data.items.length > 0) {
          setEmpresas(data.items);
          setEmpresasFiltradas(data.items);
        } else {
          console.error("Nenhum item encontrado na resposta.");
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar dados da API:", error);
      })
      .finally(() => {
        setLoading(false); // Defina como falso quando a solicitação for concluída
      });
  }, []);

  const handleSearchChange = (event) => {
    const termo = event.target.value;
    setPesquisa(termo);
    filtrarEmpresas(termo);
  };

  const filtrarEmpresas = (termo) => {
    if (termo.trim() === "") {
      setEmpresasFiltradas(empresas);
    } else {
      const empresasFiltradas = empresas.filter(
        (empresa) =>
          empresa["cod-estabel"].toLowerCase().includes(termo.toLowerCase()) ||
          empresa["cgc"].toLowerCase().includes(termo.toLowerCase()) ||
          empresa["ins-municipal"].toLowerCase().includes(termo.toLowerCase()) ||
          empresa["inscr-estad"].toLowerCase().includes(termo.toLowerCase()) ||
          empresa["razao-social"].toLowerCase().includes(termo.toLowerCase())
      );
      setEmpresasFiltradas(empresasFiltradas);
    }
  };

  const detalharModal = (epCodigo) => {
    setOverlayVisible(true);
    const urlDetalhar = `${apiUrl}/?ep-codigo=${epCodigo}`;
    fetch(urlDetalhar, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEmpresaDetalhes(data.items[0]);
        setModalOpen(true);
      })
      .catch((error) =>
        console.error("Erro ao carregar detalhes da empresa:", error)
      )
      .finally(() => {
        setOverlayVisible(false);
      });
  };

  const openEditModal = (empresa) => {
    setEmpresaEditando(empresa);
    setEditModalOpen(true);
  };

  const saveEdition = (empresa) => {
    editarEmpresa(empresa);
    setEditModalOpen(false);
  };

  const editarEmpresa = (empresa) => {
    setOverlayVisible(true);
    const urlEditar = `${apiUrl}/${empresa.cod_estabel}`;

    const dadosAtualizados = {
      cod_estabel: empresa.cod_estabel,
      cgc: empresa.cgc,
      ins_municipal: empresa.ins_municipal,
      inscr_estad: empresa.inscr_estad,
      razao_social: empresa.razao_social,
    };

    fetch(urlEditar, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(dadosAtualizados),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao editar empresa");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Empresa editada com sucesso:", data);
        setEmpresas((prevEmpresas) =>
          prevEmpresas.map((emp) =>
            emp.cod_estabel === empresa.cod_estabel ? { ...emp, ...dadosAtualizados } : emp
          )
        );
        setEmpresasFiltradas((prevEmpresas) =>
          prevEmpresas.map((emp) =>
            emp.cod_estabel === empresa.cod_estabel ? { ...emp, ...dadosAtualizados } : emp
          )
        );
      })
      .catch((error) => {
        console.error("Erro ao editar empresa:", error);
      })
      .finally(() => {
        setOverlayVisible(false);
      });
  };

  const excluirEmpresa = (epCodigo) => {
    setOverlayVisible(true);
    const urlExcluir = `${apiUrl}/?ep-codigo=${epCodigo}`;

    fetch(urlExcluir, {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao excluir empresa");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Empresa excluída com sucesso:", data);
        setEmpresas((prevEmpresas) =>
          prevEmpresas.filter((empresa) => empresa["cod-estabel"] !== epCodigo)
        );
        filtrarEmpresas(pesquisa);
      })
      .catch((error) => {
        console.error("Erro ao excluir empresa:", error);
      })
      .finally(() => {
        setOverlayVisible(false);
      });
  };

  const handleSaveNovaEmpresa = (novaEmpresa) => {
    setOverlayVisible(true);
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(novaEmpresa),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao adicionar nova empresa");
        }
        return response.json();
      })
      .then((data) => {
        setEmpresas([...empresas, data]);
        setEmpresasFiltradas([...empresas, data]);
      })
      .catch((error) => {
        console.error("Erro ao adicionar nova empresa:", error);
      })
      .finally(() => {
        setOverlayVisible(false);
        setNovaEmpresaModalOpen(false);
      });
  };

  return (
    <div className="body-empresa">
      {overlayVisible && (
        <div className="overlay visible">
          <div className="loading-container">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
          </div>
        </div>
      )}
      <div className={`container-empresa ${overlayVisible ? 'blur' : ''}`}>
        <h1 className="title-empresa">Empresa</h1>
        <div className="controls-container">
          <button
            className="btn btn-primary-empresa"
            onClick={() => setNovaEmpresaModalOpen(true)}
          >
            Nova Empresa
          </button>
          <button
            className="btn btn-outline-primary-empresa"
            onClick={() => setOverlayVisible(true)}
          >
            Outras Opções
          </button>
          <div className="search-container">
            <input
              type="text"
              className="search-input-empresa"
              placeholder="Pesquisa rápida"
              value={pesquisa}
              onChange={handleSearchChange}
            />
            <button className="btn btn-outline-secondary-empresa" type="button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped" id="userTable">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Código</th>
                <th scope="col">Nome CGC</th>
                <th scope="col">Inscrição Municipal</th>
                <th scope="col">Inscrição Estadual</th>
                <th scope="col">Razão Social</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center-em">
                    <div className="spinner-container-em">
                      <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                    </div>
                  </td>
                </tr>
              ) : (
                empresasFiltradas.map((empresa, index) => (
                  <tr key={index}>
                    <td>{empresa["cod-estabel"]}</td>
                    <td>{empresa["cgc"]}</td>
                    <td>{empresa["ins-municipal"]}</td>
                    <td>{empresa["inscr-estad"]}</td>
                    <td>{empresa["razao-social"]}</td>
                    <td>
                      <div className="container-de-botoes">
                        <button
                          type="button"
                          className="btn btn-primary-options"
                          onClick={() => detalharModal(empresa["cod-estabel"])}
                          title="Detalhar"
                        >
                          <FontAwesomeIcon icon={faEye} className="icon-small" />
                        </button>
                        <button
                          type="button"
                          className="btn btn-warning-options"
                          onClick={() => openEditModal(empresa)}
                          title="Editar"
                        >
                          <FontAwesomeIcon icon={faPencilAlt} className="icon-small" />
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger-options"
                          onClick={() => excluirEmpresa(empresa["cod-estabel"])}
                          title="Excluir"
                        >
                          <FontAwesomeIcon icon={faTrash} className="icon-small" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <DetalhesModal
          isOpen={modalOpen}
          empresa={empresaDetalhes}
          onClose={() => setModalOpen(false)}
        />
        <EditEmpresaModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          empresa={empresaEditando}
          onSave={saveEdition}
        />
        <NovaEmpresaModal
          isOpen={novaEmpresaModalOpen}
          onClose={() => setNovaEmpresaModalOpen(false)}
          onSave={handleSaveNovaEmpresa}
        />
      </div>
    </div>
  );
}

export default Empresa;
