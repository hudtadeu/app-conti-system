// ToggleButton.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";

function ToggleButton({ defaultChecked, onToggle }) {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onToggle(newState);
  };

  return (
    <div className="toggle-container">
      <button
        type="button"
        className="toggle-button"
        onClick={handleToggle}
      >
        <FontAwesomeIcon
          icon={isChecked ? faToggleOn : faToggleOff}
          size="2x"
        />
      </button>
    </div>
  );
}

export default ToggleButton;
