// Footer.js
import React from 'react';
import '../css/Footer.css'; // Import the CSS file

function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2023 Burn Surivior Activity Risk Calculator
</p>
          <div className="social-icons">
            <a href="https://www.texashealth.org/ieem/Research/Thermal-and-Vascular-Physiology-Laboratory" target="_blank" rel="noopener noreferrer" className="website-link">
              Click to Visit our Website
            </a>
          </div>
        </div>
      </footer>
      <div className="disclaimer-box">
        <p className="disclaimer">
          The provided information are guidelines and should not be viewed as recommendations.
          Individuals should stop physical activity if they are feeling overheated.
        </p>
      </div>
    </div>
  );
}

export default Footer;
