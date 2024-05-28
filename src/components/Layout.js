import React, { useState } from "react";
import Menu from "./menu/Menu";
import BackButton from "./BackButton";
import ForwardButton from "./ForwardButton";
import "./styleLayout.css";

const Layout = ({ children }) => {
  const [menuActive, setMenuActive] = useState(true);

  const handleToggleMenu = () => {
    setMenuActive((prev) => !prev);
  };

  return (
    <div className={`layout ${menuActive ? "" : "menu-inactive"}`}>
      <BackButton />
      <ForwardButton />
      <Menu menuActive={menuActive} toggleMenu={handleToggleMenu} />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
