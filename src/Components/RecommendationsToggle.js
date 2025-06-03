import React from 'react';
import { useResultColor } from './ResultColorContext';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faGlassWater, faShirt, faPause, faFan, faHand } from '@fortawesome/free-solid-svg-icons';
import '../css/ToggleBar.css';

//import icons
import { ReactComponent as Water } from '../SVG/water.svg';
import { ReactComponent as Fan } from '../SVG/fan.svg';
import { ReactComponent as Shirt } from '../SVG/shirt.svg';
import { ReactComponent as Stop } from '../SVG/stop.svg';
import { ReactComponent as Pause } from '../SVG/pause.svg';
 
function RecommendationsToggle() {
  const { resultColor } = useResultColor();

  const recommendations = {
    'Green: \n Exercise is safe.': [
      { type: 'icon', content:  <Water />},
      { type: 'text', content: '  Stay hydrated' },
      { type: 'icon', content: <Shirt /> },
      { type: 'text', content: '  Wear light clothing' }, 
    ],
    'Red: \n Unsafe exposure. Extreme Caution.': [
      { type: 'icon', content: <Stop /> },
      { type: 'text', content: '  Consider suspending activity until outside temperatures are cooler or move indoors to air conditioned space.' },
    ],
    'Yellow: \n Caution, regularly hydrate.': [
      
      { type: 'icon', content:  <Water /> },
      { type: 'text', content: '  Stay hydrated' },
      { type: 'icon', content: <Shirt /> },
      { type: 'text', content: '  Wear light clothing' },
      { type: 'icon', content: <Fan /> },
      { type: 'text', content: '  Active Cooling' },
    ],
    'Orange: \n Strong caution, regularly drink fluids, take frequent rest breaks, consider active cooling i.e., water spray.': [
      { type: 'icon', content:  <Water /> },
      { type: 'text', content: '  Stay hydrated' },
      { type: 'icon', content: <Shirt /> },
      { type: 'text', content: '  Wear light clothing' },
      { type: 'icon', content: <Fan /> },
      { type: 'text', content: '  Active Cooling' },
    ],
  };

  const renderRecommendationItem = (item, index) => {
    if (item.type === 'icon') {
      return (
        <span key={index} className="icon-container">
          {item.content}
        </span>
      );
    } else if (item.type === 'text') {
      return <span key={index}>{item.content}</span>;
    }
    return null;
  };

  const getRecommendations = () => {
    if (resultColor in recommendations) {
      const pairs = [];
      let showDisclaimer = false; // Flag to show the disclaimer

      for (let i = 0; i < recommendations[resultColor].length; i += 2) {
        const content = recommendations[resultColor][i + 1]?.content;

        const pair = (
          <div key={i} className="recommendation-pair">
            {renderRecommendationItem(recommendations[resultColor][i], i)}
            {renderRecommendationItem(recommendations[resultColor][i + 1], i + 1)}
          </div>
        );

        pairs.push(pair);

        // Check if the content includes "Wear light clothing"
        if (content && content.toLowerCase().includes('wear light clothing')) {
          showDisclaimer = true;
        }
      }

      // Show disclaimer if needed
      if (showDisclaimer) {
        pairs.push(
          <p key="disclaimer" className="clothing-disclaimer">
            If the activity you are performing requires clothing that is not considered light clothing, disregard the light clothing recommendation.
          </p>
        );
      }

      return pairs;
    } else {
      return <p>No recommendations yet.</p>;
    }
  };

  return <div>{getRecommendations()}</div>;
}

export default RecommendationsToggle;