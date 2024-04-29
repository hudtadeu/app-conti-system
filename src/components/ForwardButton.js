import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import "./styleForwardButton.css";
import { useNavigate } from "react-router-dom";

const ForwardButton = () => {
  const navigate = useNavigate();

  const goForward = () => {
    navigate(1);
  };

  return (
    <FontAwesomeIcon
      icon={faArrowCircleRight}
      onClick={goForward}
      className="forward-icon"
    />
  );
};

export default ForwardButton;
