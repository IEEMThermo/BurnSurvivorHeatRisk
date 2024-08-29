import React from 'react';
import '../css/Disclaimer.css';

const Disclaimer = () => {
  return (
    <div className="disclaimer-container">
      <div className="disclaimer-content">
        <h1 className="disclaimer-title">Disclaimer</h1>
        <p className="disclaimer-text">
          The information, including but not limited to, text, graphics, images, and other material contained on this website are provided for informational purposes only and does not constitute providing medical advice or professional services. The information provided should not be used for diagnosing or treating a health problem or disease, and those seeking personal medical advice should consult with a licensed physician. Always seek the advice of your doctor or other qualified health provider regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
        </p>
        <p className="disclaimer-text-bold">
          If you think you may have a medical emergency, call 911 or go to the nearest emergency room immediately.
        </p>
        <p className="disclaimer-text">
          No physician-patient relationship is created by this website or its use. Neither the Texas Health Presbyterian Hospital Dallas, nor UT Southwestern Medical Center, nor its employees, nor any contributor to this website, makes any representations or warranties, express or implied, with respect to the information provided herein or to its use.
        </p>
      </div>
    </div>
  );
}

export default Disclaimer;