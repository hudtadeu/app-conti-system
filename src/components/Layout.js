// Layout.js
import React from "react";
import Menu from "./menu/Menu"; // Ajuste o caminho conforme necessário

const Layout = ({ children }) => {
  return (
    <div>
      <Menu />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
