import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './Components/Header';
import Photo from './Components/Photo';
import Footer from './Components/Footer';
import Calculate from './Input';
import ReactDOM from 'react-dom';
import { ResultColorProvider } from './Components/ResultColorContext';
import Acknowledgements from './Components/Acknowledgements'; // Import the Acknowledgements component

function MainApp() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>

        
          <Route
            path="/"
            element={
              <div>
                <Photo />
                <ResultColorProvider>
                  <Calculate />
                </ResultColorProvider>
              </div>
            }
          />
          <Route path="/acknowledgements" element={<Acknowledgements />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,
  document.getElementById('root')
);

export default MainApp;
