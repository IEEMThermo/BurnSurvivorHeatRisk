import React from 'react';
import './App.css';
import Header from './Components/Header';
import Photo from './Components/Photo';
import Footer from './Components/Footer';
import Calculate from './Input';
import ReactDOM from 'react-dom';
import { ResultColorProvider } from './Components/ResultColorContext';



function MainApp() {
  return (
      <div>
        <Header />
        <Photo />
        <ResultColorProvider>
          <Calculate />
        </ResultColorProvider>
        <Footer />
      </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,
  document.getElementById('root')
);

export default MainApp;
