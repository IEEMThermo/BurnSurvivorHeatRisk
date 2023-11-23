// HelpPopup.js
import React from 'react';
import '../css/HelpPopup.css';

const HelpPopup = ({ content, onClose }) => {
  const createMarkup = () => {
    return { __html: content };
  };

  return (
    <div className="help-popup">
      <div className="help-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <div className="scroll-container">
        <div dangerouslySetInnerHTML={createMarkup()} />
      </div>
      </div>
    </div>
  );
};

export default HelpPopup;