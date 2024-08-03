import React, { useState, useRef, useEffect } from 'react';
import { getColor, two_nodes, fetchForecastData, two_nodes_forecast } from './Components/two_nodes';
import './css/Input.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useResultColor } from './Components/ResultColorContext';
import RecommendationsToggle from './Components/RecommendationsToggle';
//import './css/ToggleBar.css';
import { Collapse } from 'react-collapse';
import HelpPopup from './Components/HelpPopup';
import HelpPopupClothing from './Components/HelpPopupClothing';
import HelpPopupMet from './Components/HelpPopupMet';
import { Line } from 'react-chartjs-2';
import {Chart, registerables} from 'chart.js'; 
import citiesData from './cities.json';

//Function responsible for displaying all the input boxes, and calculate functions
function Calculate() {
  // input value state variables
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [value5, setValue5] = useState('');
  const [value6, setValue6] = useState('');
  const [value7, setValue7] = useState('');
  const [value8, setValue8] = useState('');

  //result state variables
  const [tCore, setTCore] = useState('');
  const [result, setResult] = useState('');
  const [textColor, setTextColor] = useState('result-box');
  const [resultText, setResultText] = useState('');
  const {resultColor, setResultColor} = useResultColor();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [gradientColor, setGradientColor] = useState('');

  // search bar state variables
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [coordinates, setCoordindates] = useState([]);
  const [name, setName] = useState('');
  const [coord, setCoord] = useState('');

  //unit toggles for height and weight
  const [heightUnit, changeHeightUnit] =  useState(false);
  const [weightUnit, changeWeightUnit] =  useState(false);
  const [isHover, setHover] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  //graph state variables
  const [label, setLabel] = useState('');
  const [data, setData] = useState('');
  const [isDivVisible, setIsDivVisible] = useState(false);

  //ref for result box
  const resultBoxRef = useRef(null);

  // use a state variable to trigger scrolling
  const [scrollToTop, setScrollToTop] = useState(false);

  // help button state variables
  const [showHelpMet, setShowHelpMet] = useState(false);
  const [showHelpBurnSurface, setShowHelpBurnSurface] = useState(false); 
  const [showHelpClo, setShowHelpClo] = useState(false);
  const helpTextMet = '';
  const helpTextClo = '';
  const helpTextBurnSurface = `Provide a value between 1 and 100 that represents the percentage of body surface area burn.
                             <br>
                              Do not include the % symbol.
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
  const scaledOrange = Array(8).fill(38.5);//split here >=
  const scaledRed = Array(8).fill(39);

  useEffect(() => {
    // Set cityList with the imported JSON data
    setCityData(citiesData);
  }, []);

  //handle search bar input change
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    getCityList(inputValue); // Call the provided callback with the query
  };

  const getCityList = async (query) => {
    if (query.length > 2) {
      const filtered = cityData
        .filter(city =>
          city.name.toLowerCase().includes(query.toLowerCase())
        ); // Limit to 5 cities

        let dataElements = ["", "", "", "", ""];
        let coordinates = ["", "", "", "", ""];

        filtered.forEach((item, index) => {
          if (item.admin1 === undefined) {
            dataElements[index] = String(item.name + ", " + item.country);
          } else {
            dataElements[index] = String(item.name + ", " + item.admin1 + ", " + item.country + ".   ");
          }
          coordinates[index] = String(item.lat + "," + item.lng);
        });
  
        setCoordindates(coordinates);
      setSearchResults(dataElements);
    } else {
      setCityList([]);
    }
  };

  // Dynamically set font size based on screen width
  const getFontSize = () => {
    return window.innerWidth <= 630 ? 8 : 12; 
  };

  //controls graph visibility
  const toggleDivVisibility = () => {
    setIsDivVisible(true);
  };

  // useEffect to handle scrolling
  useEffect(() => {
    if (scrollToTop && resultBoxRef.current) {
      resultBoxRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setScrollToTop(false); // reset the state after scrolling
    }
  }, [scrollToTop]);

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

  //function to change units
  const toggleHeightUnit = () => {
    changeHeightUnit(!heightUnit);
  }
  const toggleWeightUnit = () => {
    changeWeightUnit(!weightUnit);
  }

  const onMouseEnter = (val, event) => {
    let newVal = val
    if (val === 1 && heightUnit){
      newVal = val + 2;
    }

    if (val === 2 && weightUnit){
      newVal = val + 2;
    }
    setHover(newVal);
    if (event) {
      setMousePosition({ x: event.clientX + 10, y: event.clientY + 10 });
    }
  }
  const onMouseLeave = () => {
    setHover(0);
  }

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
    //adjust height and weight units
    let height = value7;
    let weight = value8;

    if (!heightUnit){
      height = height * 2.54;
    }
    if (!weightUnit){
      weight = weight / 2.2;
    }
    
    let body_surface_area = 0.007184 * Math.pow(height, 0.725) * Math.pow(weight, 0.425);
    let resultNum = await two_nodes(coord, value2, value3, value4, value5, value6, body_surface_area, weight);

    console.log(resultNum);
    setTCore(resultNum);

    let resultColor = getColor(resultNum);
    setResult(resultColor);
    setResultColor(resultColor);
  };

  //Function that calculates t_core over time and generates graph
  const GraphCalculate = async () => {
    //create y and x parameters for graph
    let forecastParameters = new Array (4);
    let forecastResult = new Array(8);

      //adjust height and weight units
      let height = value7;
      let weight = value8;
  
      if (!heightUnit){
        height = height * 2.54;
      }
      if (!weightUnit){
        weight = weight / 2.2;
      }
    
    //call the open weather api
    try{
      let forecastData = await fetchForecastData(coord);
      let body_surface_area = 0.007184 * Math.pow(height, 0.725) * Math.pow(weight, 0.425);
      forecastResult[0] = await two_nodes(coord, value2, value3, value4, value5, value6, body_surface_area, weight);

      for (let i = 0; i < 7; i++){
        for (let j = 0; j < 4; j++){
          forecastParameters[j] = forecastData[i][j];
        }

        //get t_core for the ith hour
        forecastResult[i + 1] = two_nodes_forecast(forecastParameters, value2, value3, value4, value5, value6, body_surface_area, weight);
      }

      for (let i = 0; i < 8; i++){
        if (forecastResult[i] > 40.5){
          forecastResult[i] = 40.5;
        } else if (forecastResult[i] < 36.5){
          forecastResult[i] = 36.5;
        }
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
  Chart.register(...registerables);

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    // Destroy existing chart instance if it exists
    if (chartRef.current){
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
      const ctx = chartRef.current.getContext('2d');

      // Create gradient
      // Create gradient
      let gradient;

      const createGradient = (ctx, chartArea) => {
        const { top, bottom } = chartArea;
        gradient = ctx.createLinearGradient(0, bottom, 0, top);
        gradient.addColorStop(0.125, '#7bc774');    // Green at the bottom (37)
        gradient.addColorStop(0.375, '#ddc53a'); // Yellow
        gradient.addColorStop(0.625, '#f17d3f');  // Orange
        gradient.addColorStop(0.875, '#b83c55');    // Red at the top (39)
      };

      const getGradientColorAtY = (y, chartArea) => {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = 1;
        tempCanvas.height = chartArea.bottom - chartArea.top;
        const tempCtx = tempCanvas.getContext('2d');

        // Draw the gradient on the temporary canvas
        createGradient(tempCtx, chartArea);
        tempCtx.fillStyle = gradient;
        tempCtx.fillRect(0, 0, 1, tempCanvas.height);

        // Get the color data at the specified y-coordinate
        const yInTempCanvas = tempCanvas.height - (y - 36.5)/4 * tempCanvas.height;
        console.log(yInTempCanvas + " " + tempCanvas.height)
        const imageData = tempCtx.getImageData(0, yInTempCanvas, 1, 1).data;
        return `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, ${imageData[3] / 255})`;
      };

      
      const chartData = {
        labels: label,
        datasets: [{
          label: 't_core',
          data: data,
          borderColor: 'rgba(0,0,0,1)',
          fill: true,
          tension: 0.4
        }]
      };

      // Create chart
      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              ticks: {
                font: {
                  size: 16 // Set this to your desired font size
                }
              }
            },
            y: {
              display: false,
              min: 36.5,
              max: 40.5,
            }
          },
          elements: {
            line: {
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2
            },
            point: {
              radius: 0
            }
          },
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }
          }
        },
        plugins: [{
          id: 'backgroundPlugin',
          beforeDraw: (chart) => {
            const { ctx, chartArea: { top, bottom, left, right } } = chart;
            console.log(bottom);
            createGradient(ctx, chart.chartArea);
            ctx.save();
            ctx.fillStyle = gradient;
            ctx.fillRect(left, top, right - left, bottom - top);
            ctx.restore();
          }
        }]
      });

      const yValue = data[0];
      const gradientColor = getGradientColorAtY(yValue, chartInstanceRef.current.chartArea);
      setGradientColor(gradientColor);
      console.log(`Gradient color at y=${yValue}: ${gradientColor}`);
    }
  }, [label, data]);

  useEffect(() => {
    let textColor = "";
    let resultText = "";
    
    //Set result based off of color range
    switch(resultColor) {
      case 'Green: \n Exercise is safe.':
        textColor = "Green";
        resultText = "Estimated heat stress risk is low to moderate";
        setTextColor(textColor);
        setResultText(resultText);
        break;
      case 'Red: \n Unsafe exposure. Extreme Caution.':
        textColor = "Red";
        resultText = "Estimated heat stress risk is high to extreme";
        setTextColor(textColor);
        setResultText(resultText);
        break;
      case 'Yellow: \n Caution, regularly hydrate.':
        textColor = "Yellow";
        resultText = "Estimated heat stress risk is low to moderate";
        setTextColor(textColor);
        setResultText(resultText);
        break;
      case 'Orange: \n Strong caution, regularly drink fluids, take frequent rest breaks, consider active cooling i.e., water spray.':
        textColor = "Orange";
        resultText = "Estimated heat stress risk is low to moderate";
        setTextColor(textColor);
        setResultText(resultText);
        break;
      default:
        setTextColor("");
        setResultText("");
        break;
    }
  }, [resultColor]);


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
    if (isNaN(value7) || !value7) {
      // Display an alert
      window.alert("Enter a valid value for Height.");
      return; 
    }
    if (isNaN(value8) || !value8) {
      // Display an alert
      window.alert("Enter a valid value for Weight.");
      return; 
    }

    calculate();
    GraphCalculate();
    toggleDivVisibility();

    // set the state to trigger scrolling
    setScrollToTop(true); 

  }


  return (
    <div>
      <div className='inputBox'>
        <div className='city_container' style={cursorStyle}>
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
        {/*Height input*/}
        <div className='height_container'>
          <label htmlFor="height_input">Height: </label>
          <input
            type="text"
            id="height_input"
            placeholder="Enter Height"
            value={value7}
            onChange={(e) => setValue7(e.target.value)}
          />
        <i className="fa-solid fa-ruler"></i>
        <button
          onClick={toggleHeightUnit} 
          onMouseEnter={(event) => onMouseEnter(1, event)}
          onMouseLeave={onMouseLeave}
          className={`height-unit ${heightUnit ? 'cm' : 'in'}`}
        >
          {heightUnit ? 'cm' : 'in'} 
        </button>
      </div>
      {isHover === 1 && (
          <div 
            className="hover-text"
            style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
          >
          Click to change units to cm</div>
      )}
      {isHover === 3 && (
          <div 
            className="hover-text"
            style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
          >
          Click to change units to in</div>
      )}

      {/*Weight input*/}
      <div className='weight_container'>
          <label htmlFor="weight_input">Weight: </label>
          <input
            type="text"
            id="weight_input"
            placeholder="Enter Weight"
            value={value8}
            onChange={(e) => setValue8(e.target.value)}
          />
        <i className="fa-solid fa-weight-scale"></i>
        <button
          onClick={toggleWeightUnit} 
          onMouseEnter={(event) => onMouseEnter(2, event)}
          onMouseLeave={onMouseLeave}
          className={`weight-unit ${weightUnit ? 'kg' : 'lbs'}`}
        >
          {weightUnit ? 'kg' : 'lbs'} 
        </button>
      </div>
      
      {isHover === 2 && (
          <div 
            className="hover-text"
            style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
          >
          Click to change units to kg</div>
      )}
      {isHover === 4 && (
          <div 
            className="hover-text"
            style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
          >
          Click to change units to lbs</div>
      )}

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
        <i 
          className="fa-solid fa-person-running"></i>
        <button className='met-help-button' onClick={toggleHelpMet}>?</button>
      </div>
      {showHelpMet && <HelpPopupMet content={helpTextMet} onClose={toggleHelpMet} />}

      {/*Clothing input */}
      <div className='clo_container'>
        <label htmlFor="clothing_input"> Clothing:</label>
        <select
          id="clothing_input"
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

      <div className='result' ref={resultBoxRef}>
        <div className={textColor} style={{flexDirection: 'column', alignItems: 'center', backgroundColor: gradientColor }}>
          {data[0] < 37.5 && (
            <><p>{resultText}</p><i className="fa-solid fa-face-smile fa-bounce" style={{ fontSize: '40px', marginBottom: '10px' }}></i></>
          )}
          {data[0] >= 37.5 && data[0] < 38 && (
            <><p>{resultText}</p><i className="fa-solid fa-bottle-water fa-bounce" style={{ fontSize: '40px', marginBottom: '10px' }}></i></>
          )}
          {data[0] >= 38 && data[0] < 38.5 && (
            <><p>{resultText}</p><i className="fa fa-exclamation-triangle fa-bounce" style={{ fontSize: '40px', marginBottom: '10px' }}></i></>
          )}
          {data[0] >= 38.5 && (
            <><p>{resultText}</p><i className="fa-solid fa-hand fa-beat" style={{ fontSize: '40px', marginBottom: '10px' }}></i></>
          )}
        </div>
      </div>

       {/*Toggle Bar for detailed descriptions*/}
      <div>
        <div className='toggle-bar'>
          <button className={`toggle-button ${isExpanded ? 'expanded' : ''}`} onClick={handleToggle}> Key recommendations: 
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
          <p className="forecast-title">Forecasted heat risk</p>
          <div className="legend">
            <span className="legend-color green"></span> Low
            <span className="legend-color yellow"></span> Moderate
            <span className="legend-color orange"></span> High
            <span className="legend-color red"></span> Extreme
          </div>
          <div className="forecast-chart">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      )}
      
  </div>
  );
}

export default Calculate;