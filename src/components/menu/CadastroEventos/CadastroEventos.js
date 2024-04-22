import React, { useState } from "react";
import "./styleCadastroEventos.css";

const CadastroEventos = () => {
  const [estabelecimento, setEstabelecimento] = useState("");
  const [tipoEvento, setTipoEvento] = useState("");
  const [assuntoEmail, setAssuntoEmail] = useState("");
  const [remetenteEmail, setRemetenteEmail] = useState("");
  const [textoPadraoEmail, setTextoPadraoEmail] = useState("");
  const [destinatarios, setDestinatarios] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailHTML = `
      <html>
      <head>
          <title>${assuntoEmail}</title>
      </head>
      <body>
          <h2>${tipoEvento} no ${estabelecimento}</h2>
          <p>${textoPadraoEmail}</p>
          <p>Atenciosamente,<br>${remetenteEmail}</p>
      </body>
      </html>
    `;

    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      assuntoEmail
    )}&body=${encodeURIComponent(emailHTML)}`;

    window.open(mailtoLink, "_blank");
  };

  return (
    <body className="body-evento">
      <form id="eventoForm" onSubmit={handleSubmit}>
        <h1 className="cadastroEvento">Cadastro de Eventos</h1>
        <label className="label-evento" htmlFor="estabelecimento">
          Estabelecimento:
        </label>
        <input
          className="input-evento"
          type="text"
          id="estabelecimento"
          name="estabelecimento"
          value={estabelecimento}
          onChange={(e) => setEstabelecimento(e.target.value)}
          required
        />
        <br />

        <label className="label-evento" htmlFor="tipoEvento">
          Tipo de Evento:
        </label>
        <input
          className="input-evento"
          type="text"
          id="tipoEvento"
          name="tipoEvento"
          value={tipoEvento}
          onChange={(e) => setTipoEvento(e.target.value)}
          required
        />
        <br />

        <label className="label-evento" htmlFor="assuntoEmail">
          Assunto do E-mail:
        </label>
        <input
          className="input-evento"
          type="text"
          id="assuntoEmail"
          name="assuntoEmail"
          value={assuntoEmail}
          onChange={(e) => setAssuntoEmail(e.target.value)}
          required
        />
        <br />

        <label className="label-evento" htmlFor="remetenteEmail">
          Remetente do E-mail:
        </label>
        <input
          className="input-evento"
          type="email"
          id="remetenteEmail"
          name="remetenteEmail"
          value={remetenteEmail}
          onChange={(e) => setRemetenteEmail(e.target.value)}
          required
        />
        <br />

        <label className="label-evento" htmlFor="textoPadraoEmail">
          Texto Padrão do E-mail:
        </label>
        <br />
        <textarea
          className="textarea-evento"
          id="textoPadraoEmail"
          name="textoPadraoEmail"
          rows="4"
          cols="50"
          value={textoPadraoEmail}
          onChange={(e) => setTextoPadraoEmail(e.target.value)}
          required
        />
        <br />

        <label className="label-evento" htmlFor="destinatarios">
          Destinatários:
        </label>
        <br />
        <textarea
          className="textarea-evento"
          id="destinatarios"
          name="destinatarios"
          rows="4"
          cols="50"
          value={destinatarios}
          onChange={(e) => setDestinatarios(e.target.value)}
          required
        />
        <br />

        <input className="input-evento" type="submit" value="Gerar e-mail" />
      </form>
    </body>
  );
};

export default CadastroEventos;
