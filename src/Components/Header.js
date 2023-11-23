import React from 'react';
import '../css/Header.css'; // Import your CSS file
import '@fortawesome/fontawesome-free/css/all.min.css';

function Header() {
  return (
    <header className="header">
    <div  className="header-content">
    <i className="fa-solid fa-person-running fa-2x"></i>
    <h1 className="header-title"> Burn Survivor Activity Risk Calculator </h1>
    </div>
    </header>
  );
}

export default Header;