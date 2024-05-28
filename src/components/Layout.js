import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Menu from "./menu/Menu";
import BackButton from "./BackButton";
import ForwardButton from "./ForwardButton";
import "./styleLayout.css";

const Layout = ({ children }) => {
  const [menuActive, setMenuActive] = useState(true);
  const location = useLocation();

  const handleToggleMenu = () => {
    setMenuActive((prev) => !prev);
  };

  const isHomeRoute = location.pathname === "/home";

  return (
    <div className={`layout ${menuActive ? "" : "menu-inactive"} ${isHomeRoute ? "home-background" : ""}`}>
      <BackButton />
      <ForwardButton />
      <Menu menuActive={menuActive} toggleMenu={handleToggleMenu} />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
