import React from 'react';
import '../css/Welcome.css';

function Welcome({ onAccept }) {
  return (
    <div className="welcome-overlay">
      <div className="welcome-container">
        <h1>Welcome to the Burn Survivor Heat Risk Calculator</h1>
        <p className="welcome-message">
          The Burn Survivor Heat Risk Calculator is a tool developed to inform burn survivors of their heat related risk while performing physical activity. The tool uses environmental conditions, factors related to the intensity and duration of physical activity, and their unique physical characteristics, including burn injury size, to estimate the risk of overheating.
        </p>
        <p className="welcome-message2">
          The provided information are guidelines and should not be viewed as recommendations or medical advice. Individuals should stop physical activity and seek cooler conditions if they are feeling overheated or unwell.
        </p>
    
        <button class="welcome-button" onClick={onAccept}>
            Go to Heat Risk Calculator
        </button>
      
        <p className="welcome-message3">
        DISCLAIMER: The information, including but not limited to, text, graphics, images, and other material contained on this website are provided for informational purposes only and does not constitute providing medical advice or professional services. The information provided should not be used for diagnosing or treating a health problem or disease, and those seeking personal medical advice should consult with a licensed physician. Always seek the advice of your doctor or other qualified health provider regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website. If you think you may have a medical emergency, call 911 or go to the nearest emergency room immediately. No physician-patient relationship is created by this website or its use. Neither the Texas Health Presbyterian Hospital Dallas, nor UT Southwestern Medical Center, nor its employees, nor any contributor to this website, makes any representations or warranties, express or implied, with respect to the information provided herein or to its use.
        </p>
      </div>
    </div>
  );
}

export default Welcome;