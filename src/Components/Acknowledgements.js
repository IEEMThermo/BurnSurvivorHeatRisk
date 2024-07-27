// Acknowledgements.js
import React from 'react';
import { Link } from 'react-router-dom';  
import '../css/Acknowledgements.css'; 

function Acknowledgements() {
  const backButtonStyle = {
    textDecoration: 'none',  
    padding: '10px 20px',    
    backgroundColor: '#17699d',  
    color: '#fff',         
    borderRadius: '5px',   
    marginLeft: '5px',
  };

  return (
    <div>
      <Link to="/main" style={backButtonStyle}>Go back</Link>
      <div className="acknowledgement-title">
        <h1> Acknowledgements</h1>
        <h3> The following individuals/entities were instrumental in developing this webpage:</h3>
      </div>
      <div className="acknowledgements-container">
        <div className="acknowledgements-content">
          <p>Dr. Josh Foster – King’s College London</p>
          <p>Ms. Erika Mii – University of Texas at Dallas</p>
          <p>Dr. Craig Crandall – University of Texas Southwestern Medical Center and Institute for Exercise and Environmental Medicine – Texas Health Presbyterian Hospital Dallas</p>
          <p>Dr. Federico Tartarini – University of Sydney</p>
          <p>Dr. Ollie Jay – University of Sydney</p>
          <p>Ms. Amy Acton – The Phoenix Society</p>
          <p>The Phoenix Society</p>
        </div>
      </div>
      <div className="project-funding">
        <h3>This project was funded by a grant from the National Institute of General Medical Sciences of the National Institutes of Health to Dr. Crandall (RO1GM068865).</h3>
      </div>
    </div>
  );
}

export default Acknowledgements;