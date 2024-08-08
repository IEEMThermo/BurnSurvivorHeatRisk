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
          <div className="iee">
            <h5>University of Texas Southwestern Medical Center and Institute for Exercise and Environmental Medicine – Texas Health Presbyterian Hospital Dallas</h5>
            <p>Craig Crandall, PhD</p>
            <p>Josh Foster, PhD</p>
            <p>Zachary McKenna, PhD</p>
            <p>Whitley Atkins, PhD</p>
            <p>Elizabeth Gideon, PhD</p>
          </div>
          <div className="ps">
            <h5>The Phoenix Society for Burn Survivors</h5>
            <p>Ms. Amy Acton</p>
          </div>
          <div className="us">
            <h5>University of Sydney</h5>
            <p>Federico Tartarini, PhD</p>
            <p>Ollie Jay, PhD</p>
          </div>
          <div className="utd">
            <h5>University of Texas - Dallas</h5>
            <p>Ms. Erika Mii</p>
            <p>Mr. Eric Wang</p>
          </div>
        </div>
      </div>
      <div className="project-funding">
        <h3>This project was funded by a grant from the National Institute of General Medical Sciences of the National Institutes of Health to Crandall (RO1GM068865).</h3>
      </div>
    </div>
  );
}

export default Acknowledgements;