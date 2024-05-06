import React, { useRef, useState } from "react";
import "./styleLogin.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const dataToSend = {
        user: username,
        password: password,
      };

      const base64Credentials = btoa(`${username}:${password}`);
      const response = await fetch(
        "http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/piGetLogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${base64Credentials}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao autenticar usuário");
      }

      const responseData = await response.json();

      if (
        responseData.total === 1 &&
        responseData.items &&
        responseData.items.length > 0 &&
        responseData.items[0].Erro === 0
      ) {
        sessionStorage.setItem("token", base64Credentials);
        sessionStorage.setItem("username", username);
        navigate("/home");
      } else {
        throw new Error("Usuário ou senha incorretos");
      }
    } catch (error) {
      setError(error.message);
      console.error("Erro ao efetuar login:", error);
    }
  };

  const handleKeyDown = (e, nextFieldRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextFieldRef) {
        nextFieldRef.current.focus(); // Navega para o próximo campo
      } else {
        handleLogin(e); // Se for o último campo, submete o formulário
      }
    }
  };


  return (
    <div className="mainLogin">
      <div className="logo-login">
        <img
          src="conti_original-fundo-branco.jpg"
          className="logoImage-login"
          alt="ConTi Logo"
        />
      </div>
      <div className="cardLogin">
        <form onSubmit={handleLogin}>
          <div className="formGroup-login">
            <label className="usuario-login" htmlFor="username">
              Usuário:
            </label>
            <input
              type="text"
              className="input-login"
              id="username"
              name="username"
              placeholder="Usuário"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              ref={usernameRef}
              onKeyDown={(e) => handleKeyDown(e, passwordRef)}
            />
          </div>
          <div className="textfield-login">
            <div className="formGroup-login">
              <label className="senha-login" htmlFor="password">
                Senha:
              </label>
              <input
                type="password"
                className="input-login"
                id="password"
                name="password"
                placeholder="Senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                ref={passwordRef}
                onKeyDown={(e) => handleKeyDown(e, null)}
              />
            </div>
          </div>
          <button type="submit" className="btnLogin">
            Entrar
          </button>
        </form>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
