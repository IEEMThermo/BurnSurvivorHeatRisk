import React from 'react';
import { useResultColor } from './ResultColorContext';
import '../css/ToggleBar.css';

function RecommendationsToggle() {
  const { resultColor } = useResultColor();
  const recommendations = {
    'Green: \n Exercise is safe.': [
      'Maintaining hydration through regular fluid consumption and modifying clothing is still a simple, yet effective, way of keeping cool and preserving health and performance during the summer months.',
      'You should:',
      '• Ensure pre-exercise hydration by consuming 6 ml of water per kilogram of body weight every 2-3 hours before exercise. For a 70kg individual, this equates to 420ml of fluid every 2-3 hours (a standard sports drink bottle contains 500ml).',
      '• Drink regularly throughout exercise. Aim to drink enough to offset sweat losses, but avoid over-drinking because this can also have negative health effects. To familiarize yourself with how much you typically sweat, become accustomed to weighing yourself before and after practice or competition.',
      '• Where possible, select lightweight and breathable clothing with extra ventilation.',
      '• Remove unnecessary clothing/equipment and/or excess clothing layers.',
      '• Reduce the amount of skin that is covered by clothing – this will help increase your sweat evaporation, which will help you dissipate heat.',
    ],
    'Red: \n Unsafe exposure. Extreme Caution.': [
      'Exercise/play should be suspended. If play has commenced, then all activities should be stopped as soon as possible.',
      'You should:',
      '• All players should seek shade or cool refuge in an air-conditioned space if available.',
      '• Active cooling strategies should be applied.',
    ],
    'Yellow: \n Caution, regularly hydrate.': [
      'Increasing the frequency and/or duration of your rest breaks during exercise or sporting activities is an effective way of reducing your risk for heat illness even if minimal resources are available.',
      'You should:',
      '• During training sessions, provide a minimum of 15 minutes of rest for every 45 minutes of practice.',
      '• Extend scheduled rest breaks that naturally occur during match-play of a particular sport (e.g. half-time) by ~10 minutes. This is effective for sports such as soccer/football and rugby and can be implemented across other sports such as field hockey.',
      '• Implement additional rest breaks that are not normally scheduled to occur. For example, 3 to 5-minute “quarter-time” breaks can be introduced mid-way through each half of a football or rugby match, or an extended 10-minute drinks break can be introduced every hour of a cricket match or after the second set of a tennis match.',
      '• For sports with continuous play without any scheduled breaks, courses or play duration can be shortened.',
      '• During all breaks in play or practice, everyone should seek shade – if natural shade is not available, portable sun shelters should be provided, and water freely available.',
    ],
    'Orange: \n Strong caution, regularly drink fluids, take frequent rest breaks, consider active cooling i.e., water spray.': [
      'Active cooling strategies should be applied during scheduled and additional rest breaks, or before and during activity if play is continuous. Below are strategies that have been shown to effectively reduce body temperature. The suitability and feasibility of each strategy will depend on the type of sport or exercise you are performing.',
      'You should:',
      '• Drink cold fluids and/or ice slushies before exercise commences. Note that cold water and ice slushy ingestion during exercise is less effective for cooling.',
      '• Submerge your arms/feet in cold water.',
      '• Perform water dousing – wetting your skin with cool water using a sponge or a spray bottle helps increase evaporation, which is the most effective cooling mechanism in the heat.',
      '• Use ice packs/towels – placing an ice pack or damp towel filled with crushed ice around your neck.',
      '• Consider electric (misting) fans – outdoor fans can help keep your body cool, especially when combined with a water misting system.',
    ],
  };

  // Function to get recommendations based on resultColor
  const getRecommendations = () => {
    if (resultColor in recommendations) {
      return recommendations[resultColor].map((recommendation, index) => (
        <p key={index}>{recommendation}</p>
      ));
    } else {
      return 
    }
  };

  return (
    <div>
      {getRecommendations()}
    </div>
  );
}

export default RecommendationsToggle;
