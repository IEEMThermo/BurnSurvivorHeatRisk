import React, { useEffect, useState } from 'react';
import logo from '../images/logo.jpeg';
import '../css/Input.css';

function Photo() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Define the dimensions based on the screen width
  const photoWidth = windowWidth > 650 ? '55%' : '100%';
  const photoHeight = windowWidth > 650 ? '120px' : '80px';

  return (
    <div className='photo'>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '55px', marginBottom: '55px' }}>
        <img
          src={logo}
          alt=""
          style={{ width: photoWidth, height: photoHeight }}
        />
      </div>
    </div>
  );
}

export default Photo;