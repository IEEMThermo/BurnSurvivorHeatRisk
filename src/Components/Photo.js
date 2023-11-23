import React from 'react';
//import './Title.css'; // Import your CSS file
import logo from '../images/logo.jpeg';

function Photo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '55px', marginBottom: '55px'}}>
      <img
        src={logo}
        alt="Image Description"
        style={{ width: '50%', height: '100px' }}
      />
    </div>
  );
}

export default Photo;