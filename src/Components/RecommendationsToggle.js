import React from 'react';
import { useResultColor } from './ResultColorContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassWater, faShirt, faPause, faFan, faHand } from '@fortawesome/free-solid-svg-icons';
import '../css/ToggleBar.css';

function RecommendationsToggle() {
  const { resultColor } = useResultColor();

  const recommendations = {
    'Green: \n Exercise is safe.': [
      { type: 'icon', content: faGlassWater},
      { type: 'text', content: '  Stay hydrated' },
      { type: 'icon', content: faShirt },
      { type: 'text', content: '  Wear light clothing' },
    ],
    'Red: \n Unsafe exposure. Extreme Caution.': [
      { type: 'icon', content: faHand },
      { type: 'text', content: '  Consider Suspending Play' },
    ],
    'Yellow: \n Caution, regularly hydrate.': [
      { type: 'icon', content: faGlassWater },
      { type: 'text', content: '  Stay hydrated' },
      { type: 'icon', content: faShirt },
      { type: 'text', content: '  Wear light clothing' },
      { type: 'icon', content: faPause },
      { type: 'text', content: '  Rest Breaks' },
    ],
    'Orange: \n Strong caution, regularly drink fluids, take frequent rest breaks, consider active cooling i.e., water spray.': [
      { type: 'icon', content: faGlassWater },
      { type: 'text', content: '  Stay hydrated' },
      { type: 'icon', content: faShirt },
      { type: 'text', content: '  Wear light clothing' },
      { type: 'icon', content: faPause },
      { type: 'text', content: '  Rest Breaks' },
      { type: 'icon', content: faFan },
      { type: 'text', content: '  Active Cooling' },
    ],
  };

  const renderRecommendationItem = (item, index) => {
    if (item.type === 'icon') {
      return <FontAwesomeIcon key={index} icon={item.content} />;
    } else if (item.type === 'text') {
      return <span key={index}>{item.content}</span>;
    }
    return null;
  };

  const getRecommendations = () => {
    if (resultColor in recommendations) {
      const pairs = [];
      for (let i = 0; i < recommendations[resultColor].length; i += 2) {
        const pair = (
          <div key={i} className="recommendation-pair">
            {renderRecommendationItem(recommendations[resultColor][i], i)}
            {renderRecommendationItem(recommendations[resultColor][i + 1], i + 1)}
          </div>
        );
        pairs.push(pair);
      }
      return pairs;
    } else {
      return <p>No recommendations for this color.</p>;
    }
  };

  return <div>{getRecommendations()}</div>;
}

export default RecommendationsToggle;
