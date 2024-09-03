import React from 'react';
import '../css/Privacy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <div className="privacy-policy-content">
        <h1 className="privacy-policy-title">Privacy Policy</h1>
        <p className="effective-date"><strong>Effective Date:</strong> 08/28/2024</p>

        <div className="section">
          <h2 className="section-title">Introduction</h2>
          <p className="section-text">We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we handle the information you provide when using our website.</p>
        </div>

        <div className="section">
          <h2 className="section-title">Information We Collect</h2>
          <p className="section-text">Our website allows users to manually enter their location, height, and weight. Please note that this information is not collected, stored, monitored, or processed by us in any way.</p>
        </div>

        <div className="section">
          <h2 className="section-title">No Data Collection</h2>
          <p className="section-text">We do not operate any servers, and therefore, no data you enter on our website is collected, stored, or shared. The information you provide is used solely by you and remains on your device. We have no access to this data and do not track your activity.</p>
        </div>

        <div className="section">
          <h2 className="section-title">Third-Party Services</h2>
          <p className="section-text">As we do not collect any data, we do not share your information with any third parties. However, be aware that your internet service provider or other third-party entities may have access to your internet usage data.</p>
        </div>

        <div className="section">
          <h2 className="section-title">Cookies</h2>
          <p className="section-text">Our website does not use cookies.</p>
        </div>

        <div className="section">
          <h2 className="section-title">Changes to This Policy</h2>
          <p className="section-text">We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the “Effective Date” will be updated accordingly.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;