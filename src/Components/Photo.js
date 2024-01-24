import React, { useEffect, useState } from 'react';
import logo from '../images/logo.jpeg';
import '../css/Photo.css';

function Photo() {
  //const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  /*
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
  */

  // Define the dimensions based on the screen width
  /*
  const photoWidth = windowWidth > 750 ? '52%' : '80%';
  const photoHeight = windowWidth > 750 ? '100px' : '80px';
  */

  return (
    <div className='photo'>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5px', marginBottom: '30px' }}>
        <img
          src={logo}
          alt=""
        />
      </div>
    </div>
  );
}

export default Photo;