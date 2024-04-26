import React from "react";
import { useNavigate } from "react-router-dom";
import "./styleBackButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <FontAwesomeIcon
      icon={faArrowCircleLeft}
      onClick={goBack}
      className="back-icon"
    />
  );
};

export default BackButton;
