import React, { useEffect, useState } from 'react';

const ReferrerButton = () => {
  const [referrer, setReferrer] = useState(null);

  useEffect(() => {
    // Capture the referrer
    const referrerURL = document.referrer;
    console.log(document.referrer);

    // Check if the referrer is the specific site you want
    //referrerURL.includes('https://www.phoenix-society.org/resources/burn-survivor-heat-risk-calculator')
    if (referrerURL.includes('https://www.phoenix-society.org/resources/burn-survivor-heat-risk-calculator')) {
        console.log("true")
        setReferrer('https://www.phoenix-society.org/resources/burn-survivor-heat-risk-calculator');
    }
  }, []);

  const handleClick = () => {
    if (referrer) {
      // Redirect back to the referrer
      window.location.href = referrer;
    }
  };

  const backButtonStyle = {
    fontSize: '16px',
    textDecoration: 'none',  
    padding: '10px 20px',    
    backgroundColor: '#17699d',
    border: 'none',  
    cursor: 'pointer',
    color: '#fff',         
    borderRadius: '5px',   
    marginLeft: '5px',
  };

  return (
    <div>
      {referrer && (
        <button onClick={handleClick} style={backButtonStyle}>
          Return to Pheonix Society
        </button>
      )}
    </div>
  );
};

export default ReferrerButton;