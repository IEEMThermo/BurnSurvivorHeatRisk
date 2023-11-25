import React from 'react';
import logo from '../images/logo.jpeg';
import '../css/Input.css';

function Photo() {
  return (
    <div className='photo'>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '55px', marginBottom: '55px'}}>
      <img
        src={logo}
        alt=""
        style={{ width: '55%', height: '120px' }}
      />
      </div>
    </div>
  );
}

export default Photo;