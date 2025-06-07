// Footer.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Welcome from './Welcome';
import '../css/Footer.css'; // Import the CSS file

function Footer() {
  const [showWelcome, setShowWelcome] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          <button 
            onClick={() => setShowWelcome(true)} 
            className="welcome-page-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit'}}
          >
            Click to View Welcome Page
          </button>
        </p>
        <a href="https://www.phoenix-society.org" target="_blank" rel="noopener noreferrer" className="resource-link">
          Click to View Additional Resources for Burn Survivors
        </a>
        <a href="https://www.texashealth.org/ieem/Research/Thermal-and-Vascular-Physiology-Laboratory/Current-Research-Opportunities" target="_blank" rel="noopener noreferrer" className="website-link">
          Click to Learn More About Research Opportunities
        </a>
        <p>
          <Link to="/acknowledgements" className="acknowledgements-link">
            Click to View Acknowledgements
          </Link>
        </p>
        
        <Link to="/disclaimer" className="disclaimer-link">
            Click to View Disclaimer
        </Link>

        <Link to="/privacy" className="privacy-link">
            Click to View Privacy Policy
        </Link>
      </div>
      {showWelcome && <Welcome onAccept={() => setShowWelcome(false)} />}
    </footer>
  );
}

export default Footer;
