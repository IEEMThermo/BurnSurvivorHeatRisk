import React, { useState } from 'react';
import { getColor, two_nodes, fetchForecastData, two_nodes_forecast } from './Components/two_nodes';
import './css/Input.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useResultColor } from './Components/ResultColorContext';
import RecommendationsToggle from './Components/RecommendationsToggle';
//import './css/ToggleBar.css';
import { Collapse } from 'react-collapse';
import axios from 'axios';
import HelpPopup from './Components/HelpPopup';
import HelpPopupClothing from './Components/HelpPopupClothing';
import { Line } from 'react-chartjs-2';
import {Chart, registerables} from 'chart.js'; 

//Function responsible for displaying all the input boxes, and calculate functions
function Calculate() {
  // input value state variables
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [value5, setValue5] = useState('');
  const [value6, setValue6] = useState('');

  //result state variables
  const [result, setResult] = useState('');
  const [textColor, setTextColor] = useState('result-box');
  const [resultText, setResultText] = useState('');
  const {resultColor, setResultColor} = useResultColor();
  const [isExpanded, setIsExpanded] = React.useState(false);

  // search bar state variables
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [coordinates, setCoordindates] = useState([]);
  const [name, setName] = useState('');
  const [coord, setCoord] = useState('');

  //graph state variables
  const [label, setLabel] = useState('');
  const [data, setData] = useState('');
  const [isDivVisible, setIsDivVisible] = useState(false);


  // help button state variables
  const [showHelpMet, setShowHelpMet] = useState(false);
  const [showHelpBurnSurface, setShowHelpBurnSurface] = useState(false); 
  const [showHelpClo, setShowHelpClo] = useState(false);
  const helpTextMet = `Activity level reflects how physically active you are. <br>
                    Make the best estimate of your activity level, using these examples:
                    <br>
                    <br>
                    Low Level Activities:
                    <ul>
                      <li>Light manual work (writing, typing, drawing, sewing, book-keeping)</li>
                      <li>Hand and arm work (small bench tools, inspection, assembly or sorting of light materials)</li>
                      <li>Arm and leg work (driving vehicle in normal conditions, operating foot switch or pedal)</li>
                      <li>Standing drilling (small parts)</li>
                      <li>Milling machine (small parts)</li>
                      <li>Coil winding</li>
                      <li>Small armature winding</li>
                      <li>Machining with low power tools</li>
                      <li>Casual walking</li>
                    </ul>

                    Moderate Level Activities:
                    <ul>
                      <li>Sustained hand and arm work (hammering in nails, filing)</li>
                      <li>Arm and leg work (off-road operation of lorries, tractors or construction equipment)</li>
                      <li>Arm and trunk work (work with pneumatic hammer, tractor assembly, plastering, intermittent handling of moderately heavy material, weeding, hoeing, picking fruits or vegetables, pushing or pulling lightweight carts or wheelbarrows)</li>
                    </ul>

                    High Level Activities:
                    <ul>
                      <li>Intense arm and trunk work</li>
                      <li>Carrying heavy material</li>
                      <li>Shovelling</li>
                      <li>Sledgehammer work</li>
                      <li>Sawing</li>
                      <li>Planing or chiselling hard wood</li>
                      <li>Hand mowing</li>
                      <li>Digging</li>
                      <li>Pushing or pulling heavily loaded hand carts or wheelbarrows</li>
                      <li>Chipping castings</li>
                      <li>Concrete block laying</li>
                    </ul>

                    Very High Level Activties:
                    <ul>
                      <li>Very intense activity at fast to maximum pace</li>
                      <li>Working with an axe</li>
                      <li>Intense shovelling or digging</li>
                      <li>Climbing stairs, ramp or ladder</li>
                      <li>Walking quickly with small steps</li>
                      <li>Running</li>
                    </ul>`;
  const helpTextClo = '';
  const helpTextBurnSurface = `Provide a value between 1 and 100 that represents the percentage of body surface area burn. Do not include the % symbol.
                              <br> <br>
                              If you are unsure of your burn surface area, visit one of these resources to estimate that area: <br>
                              <br>
                              <a href="https://www.burn-app.com/" target="_blank">Estimate Burn Surface Area Website</a>\n <br>
                              <a href="https://burn.med.jhmi.edu/" target="blank">Estimate Burn Surface Area App</a>`;
  
  //cursor 
  const cursorStyle = { cursor: 'pointer'};

  // Update the data for the green, yellow, orange, and red portions on the graph
  const scaledGreen = Array(8).fill(37.5);
  const scaledYellow = Array(8).fill(38);
  const scaledOrange = Array(8).fill(38.5);
  const scaledRed = Array(8).fill(39);

  //Function that gets city based off of user input
  async function getCityName(zipcode) {
    const zipcodeStr = String(zipcode);

    //open weather api call
    const CITY_BASE_URL = "https://api.openweathermap.org/geo/1.0/direct?q=";
    const API_KEY = process.env.REACT_APP_API_KEY;
    const city_url = `${CITY_BASE_URL}${zipcodeStr}&limit=5&appid=${API_KEY}`;

    //query search results
    try {
      const response = await axios.get(city_url);
      const data = response.data;
      let dataElements = ["", "", "", "", ""];
      let coordinates = ["", "", "", "", ""];
      data.forEach((item, index) => {
        if (item.state === undefined) {
          dataElements[index] = String(item.name + ", " + item.country);
        } else {
          dataElements[index] = String(item.name + ", " + item.state + ", " + item.country + ".   ");
        }
        coordinates[index] = String(item.lat + "," + item.lon);
      });

      setCoordindates(coordinates);
      return dataElements;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  let dataset = [["", ""], ["", ""], ["", ""], ["", ""], ["", ""]];

  //handle search bar input change
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    handleSearch(inputValue); // Call the provided callback with the query
  };

  // Define a callback function to handle search
  const handleSearch = async (query) => {
    try{
        if(query === ""){
            dataset = [["", ""], ["", ""], ["", ""], ["", ""], ["", ""]];
        } else {
            dataset = await getCityName(query);
            setSearchResults(dataset);
        }
        
    }catch(error){
        throw error;
    }
  }

  // Dynamically set font size based on screen width
  const getFontSize = () => {
    return window.innerWidth <= 630 ? 8 : 12; 
  };

  //controls graph visibility
  const toggleDivVisibility = () => {
    setIsDivVisible(true);
  };

  // Define functions to handle input changes
  const handleItemClick = (item) => {
    //setSelectedItem(item);
    setName(searchResults[item]);
    setCoord(coordinates[item]);
    // Clear the search results when a city is selected
    setSearchResults([]);
    //change text in input field
    setQuery(searchResults[item]);
  };

  // Function to expand detailed descriptions button
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  //Function to show/hide the activity level help button pop up
  const toggleHelpMet = () => {
    setShowHelpMet(!showHelpMet);
  };

  //Function to show/hide the clothing level help button pop up
  const toggleHelpClo = () => {
    setShowHelpClo(!showHelpClo);
  };

  //Function to show/hide the burn surface area help pop up
  const toggleHelpBurnSurface = () => {
    setShowHelpBurnSurface(!showHelpBurnSurface);
  };

  //Function that calls two_nodes, performs the calculation, and sets the result
  const calculate = async () => {
    let resultNum = await two_nodes(coord, value2, value3, value4, value5, value6);
    let resultColor = getColor(resultNum);
    setResult(resultColor);
    setResultColor(resultColor);

    let textColor = "";
    let resultText = "";
    
    //Set result based off of color range
    switch(resultColor) {
      case 'Green: \n Exercise is safe.':
        textColor = "Green";
        resultText = "Estimated heat stress risk is low";
        setTextColor(textColor);
        setResultText(resultText);
        break;
      case 'Red: \n Unsafe exposure. Extreme Caution.':
        textColor = "Red";
        resultText = "Estimated heat stress risk is extreme";
        setTextColor(textColor);
        setResultText(resultText);
        break;
      case 'Yellow: \n Caution, regularly hydrate.':
        textColor = "Yellow";
        resultText = "Estimated heat stress risk is moderate";
        setTextColor(textColor);
        setResultText(resultText);
        break;
      case 'Orange: \n Strong caution, regularly drink fluids, take frequent rest breaks, consider active cooling i.e., water spray.':
        textColor = "Orange";
        resultText = "Estimated heat stress risk is high";
        setTextColor(textColor);
        setResultText(resultText);
        break;
      default:
        setTextColor("");
        setResultText("");
        break;
    }
  };

  //Function that calculates t_core over time and generates graph
  const GraphCalculate = async () => {
    //create y and x parameters for graph
    let forecastParameters = new Array (4);
    let forecastResult = new Array(8);
    const times = new Array(8);
    
    //call the open weather api
    try{
      let forecastData = await fetchForecastData(coord);

      for (let i = 0; i < 8; i++){
        for (let j = 0; j < 4; j++){
          forecastParameters[j] = forecastData[i][j];
        }

        times[i] = forecastData[i][4];
        //get t_core for the ith hour
        forecastResult[i] = two_nodes_forecast(forecastParameters, value2, value3, value4, value5, value6);
      }

      const currentTime = new Date();
      let hour = currentTime.getHours();
      let timesArray = ["", "", "", "", "","", "", ""];
      for(let i = 0; i < 8; i++){
        if(hour >=24){
          hour = hour - 24;
        }
        
      // Convert to 12-hour format and add AM/PM
      let displayHour = hour % 12 || 12;
      let ampm = hour < 12 ? "AM" : "PM";
    
      timesArray[i] = `${displayHour}:${"00"} ${ampm}`;
        hour = hour + 3;
      }

      setLabel(timesArray);
      setData(forecastResult);

    }catch(error){
      throw error;
    }
  };

  // Create the chart data
  let chart = {

    labels: label,
    datasets: [
      {
        label: 't_core',
        data: data,
        borderColor: 'rgba(0,0,0,1)',
        backgroundColor: 'rgba(0, 0, 0, 1)', //
      },
      //green (less than or equal to 37.5)
      {
        data: scaledGreen,
        fill: true,
        backgroundColor: '#7bc774', //
        pointRadius: 0,
      },
      //yellow (37.51 - 37.99)
      {
        data: scaledYellow,
        fill: true,
        backgroundColor: '#ddc53a', //
        pointRadius: 0,
      },
      //orange (38 - 38.49)
      {
        data: scaledOrange,
        fill: true,
        backgroundColor: '#f17d3f', //
        pointRadius: 0,
      },
      //red (38.5)
      {
        data: scaledRed,
        fill: true,
        backgroundColor: '#b83c55', //
        pointRadius: 0,
      },
    ],
  };
  Chart.register(...registerables);

  //When user presses the "calculate" button
  const handleButtonClick = () => {
    // Check if a city has not been selected
    if (!name) {
      // Display an alert
      window.alert("Enter a city.");
      return; 
    }
    // Check if value2 (Metabolic Rate) is not selected
    if (!value2) {
      // Display an alert
      window.alert("Enter an option for Activity Level.");
      return; 
    }
    // Check if value3 (Clothing) is not selected
    if (!value3) {
      // Display an alert
      window.alert("Enter an option for Clothing.");
      return; 
    }
    // Check if value4 (Burn Surface Area) is not selected
    if (isNaN(value4) || value4 < 1 || value4 > 100 || !value4) {
      // Display an alert
      window.alert("Enter a valid Burn Surface Area between 1 and 100. Do not include the % symbol.");
      return; 
    }
    // Check if value5 (Duration) is not selected
    if (isNaN(value5) || value5 < 1 || !value5) {
      // Display an alert
      window.alert("Enter a valid Duration of Activity.");
      return; 
    }
    // Check if value6 (Activity Environemnt) is not selected
    if (!value6) {
      // Display an alert
      window.alert("Enter an option for Activity Environment.");
      return; 
    }
    calculate();
    GraphCalculate();
    toggleDivVisibility();
  }


  return (
    <div>
      <div className='inputBox'>
        <div className='city_container'>
          <div style={cursorStyle}>
            <div className="search-container">
            <label htmlFor="city_input"> City:</label>
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
                onFocus={() => {
                  setQuery(''); // Clear the search bar input
                  // Clear the search results when focusing on the search bar
                  setSearchResults([]);
                }}          
              />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            {/* Display search results */}
            {searchResults.length > 0 && (
              <div className='search-results'>
                <ul>
                  {searchResults.map((result, index) => (
                    <li
                      key={index}
                      onClick={() => handleItemClick(index)}
                      className={selectedItem === result ? 'selected' : ''}
                    >
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

      {/*Metabolic Rate input*/}
      <div className='met_container'>
        <label htmlFor="metabolic_rate_input"> Activity Level:</label>
        <select
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
        >
          <optgroup>
          <option value=""disabled hidden>Select Activity Level</option>
          <option value="1">Rest</option>
          <option value="2">Low</option>
          <option value="3">Moderate </option>
          <option value="4">High </option>
          <option value="5">Very High </option>
          </optgroup>
        </select>
        <i className="fa-solid fa-person-running"></i>
        <button className='met-help-button' onClick={toggleHelpMet}>?</button>
      </div>
      {showHelpMet && <HelpPopup content={helpTextMet} onClose={toggleHelpMet} />}

      {/*Clothing input */}
      <div className='clo_container'>
        <label htmlFor="clothing_input"> Clothing:</label>
        <select
          value={value3}
          onChange={(e) => setValue3(e.target.value)}
        >
          <optgroup>
          <option value=""disabled hidden>Select Clothing Coverage</option>
          <option value="0.15">Very light</option>
          <option value="0.3">Light</option>
          <option value="0.7">Moderate</option>
          <option value="1.0">Heavy</option>
          <option value="1.5">Very Heavy</option>
          </optgroup>
        </select>
        <i className="fa-solid fa-shirt"></i>
        <button className='clo-help-button' onClick={toggleHelpClo}>?</button>
      </div>
      {showHelpClo && <HelpPopupClothing content={helpTextClo} onClose={toggleHelpClo} />}

      {/*Burn Surface Area input*/}
      <div className='burnsa_container'>
        <label htmlFor="burn_surface_area_input">Burn Surface Area (%): </label>
        <input
          type="text"
          id="burn_surface_area_input"
          placeholder="Enter Burn Surface Area"
          value={value4}
          onChange={(e) => setValue4(e.target.value)}
        />
        <i className="fa-solid fa-person"></i>
        <button className='burnsurface-help-button' onClick={toggleHelpBurnSurface}>?</button>
      </div>
      {showHelpBurnSurface && <HelpPopup content={helpTextBurnSurface} onClose={toggleHelpBurnSurface} />}

       {/*Duration input*/}
      <div className='duration_container'>
        <label htmlFor="duration_input"> Duration of Activity (min): </label>
        <input
          type="text"
          id="duration_input"
          placeholder="Enter Duration"
          value={value5}
          onChange={(e) => setValue5(e.target.value)}
        />
         <i className="fa-solid fa-clock"></i>
      </div>

      {/*Shade/Sun/Indoors input*/}
      <div className='shade_container'>
        <label htmlFor="sun_exposure_input"> Activity Environment: </label>
        <select
          value={value6}
          onChange={(e) => setValue6(e.target.value)}
          >
          <optgroup>
          <option value=""disabled hidden>Select Activity Environment </option>
          <option value="1">Outside and in the shade</option>
          <option value="2">Outside and in direct sun</option>
          <option value="3">Indoors and in an air conditioned space </option>
          <option value="4">Indoors and in a moderately warm space </option>
          <option value="5">Indoors and in a hot space</option>
          </optgroup>
          </select>
          <i className="fa-solid fa-cloud-sun"></i>
      </div>

    </div>
 
      {/*Calculate  button*/}
      <div className='calculate'>
        <button className='calculate-button' onClick={handleButtonClick}>Calculate</button>
      </div>

      <div className='result'>
        <div className={textColor} style={{flexDirection: 'column', alignItems: 'center' }}>
          {resultText === "Estimated heat stress risk is low" && (
            <><p>{resultText}</p><i className="fa-solid fa-face-smile fa-bounce" style={{ fontSize: '40px', marginBottom: '10px' }}></i></>
          )}
          {resultText === "Estimated heat stress risk is moderate" && (
            <><p>{resultText}</p><i className="fa-solid fa-bottle-water fa-bounce" style={{ fontSize: '40px', marginBottom: '10px' }}></i></>
          )}
          {resultText === "Estimated heat stress risk is high" && (
            <><p>{resultText}</p><i className="fa fa-exclamation-triangle fa-bounce" style={{ fontSize: '40px', marginBottom: '10px' }}></i></>
          )}
          {resultText === "Estimated heat stress risk is extreme" && (
            <><p>{resultText}</p><i className="fa-solid fa-hand fa-beat" style={{ fontSize: '40px', marginBottom: '10px' }}></i></>
          )}
        </div>
      </div>

       {/*Toggle Bar for detailed descriptions*/}
      <div>
        <div className='toggle-bar'>
          <button className={`toggle-button ${isExpanded ? 'expanded' : ''}`} onClick={handleToggle}> Detailed cooling recommendations: 
          <i className={`fa fa-caret-down icon ${isExpanded ? 'expanded' : ''}`} />
          </button>
          <Collapse isOpened={isExpanded}>
            <button className='detailed-descriptions'>
              <RecommendationsToggle />
            </button>
          </Collapse>
        </div>
      </div>

      {/*Forecasted Risk Graph */}
      {isDivVisible && (
        <div className="graph-container">
          <p className="forecast-title">Forecasted heat risk for the next 24 hours</p>
          <div className="legend">
          <span className="legend-color green"></span> Low
          <span className="legend-color yellow"></span> Moderate
          <span className="legend-color orange"></span> High
          <span className="legend-color red"></span> Extreme
        </div>
          <Line
            data={chart}
            options={{
              // ... (other chart options)
              scales: {
                y: {
                  display: false,
                },
              x: {
                ticks: {
                  font: {
                    size: getFontSize(), // Adjust this value to set the desired font size
                  },
                },
               },
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          >
          
          </Line>
        </div>
      )}
      
  </div>
  );
}

export default Calculate;