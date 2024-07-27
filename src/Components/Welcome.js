import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Welcome.css';

function Welcome() {
  return (
    <div className="welcome-container">
      <h1>Welcome to the Burn Survivor Heat Risk Calculator</h1>
      <p className="welcome-message">
        The Burn Survivor Heat Risk Calculator is a tool developed to inform burn survivors of their heat related risk while performing physical activity. The tool uses environmental conditions, factors related to the intensity and duration of physical activity, and their unique physical characteristics, including burn injury size, to estimate the risk of overheating.
      </p>
      <p className="welcome-message2">
        The provided information are guidelines and should not be viewed as recommendations or medical advice. Individuals should stop physical activity and seek cooler conditions if they are feeling overheated or unwell.
      </p>
      <Link to="/main">
        <button>Go to Main Page</button>
      </Link>
    </div>
  );
}

export default Welcome;