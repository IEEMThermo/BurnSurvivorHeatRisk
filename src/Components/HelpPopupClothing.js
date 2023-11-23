import React from 'react';
import '../css/HelpPopup.css';
import cloimage from '../images/cloimage.jpeg';

const HelpPopupClothing = ({ content, onClose }) => (
  <div className="help-popup">
    <div className="help-content">
      <span className="close-button" onClick={onClose}>
        &times;
      </span>
      <p>Make the best estimate of your clothing coverage:</p>
      <img src={cloimage} alt="Clothing Coverage" id="clo-image" />
    </div>
  </div>
);

export default HelpPopupClothing;