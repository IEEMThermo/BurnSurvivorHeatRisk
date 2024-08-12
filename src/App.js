import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './Components/Header';
import Photo from './Components/Photo';
import Footer from './Components/Footer';
import Calculate from './Input';
import ReactDOM from 'react-dom';
import { ResultColorProvider } from './Components/ResultColorContext';
import Acknowledgements from './Components/Acknowledgements'; // Import the Acknowledgements component
import Welcome from './Components/Welcome';
import { Helmet } from 'react-helmet';

function MainApp() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          {/* Route for Welcome Page */}
          <Route 
            path="/" 
            element={
              <>
                <Helmet>
                  <title> Burn Survivor Heat Risk Calculator</title>
                  <meta name="description" content="A tool to inform burn survivors of heat related risk while performing physical activity and estimates the risk of overheating." />
                  <link rel="canonical" href="https://burnsurvivorheatrisk.org" />
                </Helmet>
                <Welcome />
              </>
            } 
          />
          
          {/* Route for Main Page */}
          <Route
            path="/main"
            element={
              <>
                <Helmet>
                  <title>Main - Burn Survivor Heat Risk Calculator</title>
                  <meta name="description" content="Learn about heat risks and how to stay safe on the main calculator page of Burn Survivor Heat Risk." />
                  <link rel="canonical" href="https://burnsurvivorheatrisk.org" />
                </Helmet>
                <div>
                  <Photo />
                  <ResultColorProvider>
                    <Calculate />
                  </ResultColorProvider>
                </div>
              </>
            }
          />
          
          {/* Route for Acknowledgements Page */}
          <Route 
            path="/acknowledgements" 
            element={
              <>
                <Helmet>
                  <title>Acknowledgements - Burn Survivor Heat Risk Calculator</title>
                  <meta name="description" content="Acknowledgements for contributions to the Burn Survivor Heat Risk Calculator site." />
                  <link rel="canonical" href="https://burnsurvivorheatrisk.org" />
                </Helmet>
                <Acknowledgements />
              </>
            } 
          />
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
