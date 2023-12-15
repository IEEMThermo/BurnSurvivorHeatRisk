// Footer.js
import React from 'react';
import '../css/Footer.css'; // Import the CSS file


function Footer() {
  return (
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2023 Burn Survivor Activity Risk Calculator</p>
            <a href="https://www.texashealth.org/ieem/Research/Thermal-and-Vascular-Physiology-Laboratory" target="_blank" rel="noopener noreferrer" className="website-link">
              Click to Visit our Website
            </a>
          <p className="disclaimer">
          The provided information are guidelines and should not be viewed as recommendations.
          Individuals should stop physical activity if they are feeling overheated.
        </p>
        </div>
      </footer>
  );
}

export default Footer;
