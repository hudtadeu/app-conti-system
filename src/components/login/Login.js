import React, { useRef, useState, useEffect } from "react";
import "./styleLogin.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUser, faLock, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const usernameRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    document.body.classList.add("login-page");

    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

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
        navigate("/dashboard");
      } else {
        throw new Error("Usuário ou senha incorretos");
      }
    } catch (error) {
      setError(error.message);
      console.error("Erro ao efetuar login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e, nextFieldRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextFieldRef) {
        nextFieldRef.current.focus(); 
      } else {
        handleLogin(e); 
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
              {error && <span className="error-icon">*</span>}
            </label>
            <div className="input-container-login">
              <FontAwesomeIcon icon={faUser} className={`input-icon-login ${error && 'error-icon'}`} />
              <input
                type="text"
                className={`input-login ${error && 'input-error'}`}
                id="username"
                name="username"
                placeholder="Usuário"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                ref={usernameRef}
                onKeyDown={(e) => handleKeyDown(e, passwordRef)}
              />
            </div>
          </div>
          <div className="textfield-login">
            <div className="formGroup-login">
              <label className="senha-login" htmlFor="password">
                Senha:
                {error && <span className="error-icon">*</span>}
              </label>
              <div className="input-container-login">
                <FontAwesomeIcon icon={faLock} className={`input-icon-login ${error && 'error-icon'}`} />
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input-login ${error && 'input-error'}`}
                  id="password"
                  name="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  ref={passwordRef}
                  onKeyDown={(e) => handleKeyDown(e, null)}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="toggle-password-icon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btnLogin" disabled={isLoading}>
            {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Entrar"}
          </button>
        </form>
        {error && <p className="error-message-login">{error}</p>}
        <div className="logo-login-footer">
          <img
            src="xmlloader-logo-preview.png"
            className="logo-footer-login"
            alt="ConTi Logotech"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
