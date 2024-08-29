// Footer.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../css/Footer.css'; // Import the CSS file

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          <Link to= "/" className= "welcome-page-link">
            Click to View Welcome Page
          </Link>
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
    </footer>
  );
}

export default Footer;
