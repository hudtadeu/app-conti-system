import React, { useEffect, useState } from "react";
import "./styleEmpresa.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencilAlt,
  faTrash,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

function Empresa() {
  const [empresas, setEmpresas] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const apiUrl =
    "http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/boRequestEmpresa";

  useEffect(() => {
    const base64Credentials = sessionStorage.getItem("token");

    if (!base64Credentials) {
      console.error("base64Credentials não encontrado na sessionStorage");
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
        } else {
          console.error("Nenhum item encontrado na resposta.");
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar dados da API:", error);
      });
  }, []);

  function detalharModal(epCodigo) {
    console.log("Código: ", epCodigo);
    const urlDetalhar = `${apiUrl}/?ep-codigo=${epCodigo}`;

    fetch(urlDetalhar, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao solicitar os detalhes da empresa");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Resposta da API de detalhar:", data);
      })
      .catch((error) => {
        console.error("Erro ao carregar detalhes da empresa:", error);
      });
  }

  function editarEmpresa(epCodigo) {
    console.log("Código: ", epCodigo);
    const urlEditar = `${apiUrl}/?ep-codigo=${epCodigo}`;

    const dadosAtualizados = {
      // Insira os dados atualizados da empresa aqui
      cod_estabel: "Novo Estabelecimento",
      cgc: "Novo CGC",
      ins_municipal: "Nova Inscrição Municipal",
      inscr_estad: "Nova Inscrição Estadual",
      razao_social: "Nova Razão Social",
      // Etc...
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
      })
      .catch((error) => {
        console.error("Erro ao editar empresa:", error);
      });
  }

  function excluirEmpresa(epCodigo) {
    console.log("Código: ", epCodigo);
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
      })
      .catch((error) => {
        console.error("Erro ao excluir empresa:", error);
      });
  }

  return (
    <body className="body-empresa">
      <div className="container-empresa">
        <h1 className="title-empresa">Empresa</h1>
        <div className="controls-container">
          <button
            className="btn btn-primary"
            onClick={() => console.log("Abrindo modal para nova empresa")}
          >
            Nova Empresa
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => console.log("Mostrando opções")}
          >
            Outras Opções
          </button>
          <div className="search-container">
            <input
              type="text"
              className="form-control"
              placeholder="Pesquisa rápida"
              value={pesquisa}
              onChange=""
            />
            <button className="btn btn-outline-secondary" type="button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
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
            {empresas.map((empresa, index) => (
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
                      onClick={() => editarEmpresa(empresa["cod-estabel"])}
                      title="Editar"
                    >
                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        className="icon-small"
                      />
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
            ))}
          </tbody>
        </table>
      </div>
    </body>
  );
}

export default Empresa;
