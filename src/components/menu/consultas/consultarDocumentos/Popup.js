import React from 'react';
import './stylePopup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="message-content">
          <FontAwesomeIcon icon={faExclamationCircle} className="exclamation-icon-popup" />
          <p>{message}</p>
        </div>
        <FontAwesomeIcon icon={faTimes} className="close-icon-popup" onClick={onClose} />
      </div>
    </div>
  );
};

export default Popup;


