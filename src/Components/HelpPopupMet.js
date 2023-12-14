import React from 'react';
import '../css/HelpPopup.css';
import metimage from '../images/metimage.jpeg';

const HelpPopupMet = ({ content, onClose }) => (
  <div className="help-popup">
    <div className="help-content">
      <span className="close-button" onClick={onClose}>
        &times;
      </span>
      <p>Make the best estimate of your activity level:</p>
      <img src={metimage} alt="Activity Level" id="met-image" />
    </div>
  </div>
);

export default HelpPopupMet;