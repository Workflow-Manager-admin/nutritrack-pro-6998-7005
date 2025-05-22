import React from 'react';
import MealSection from '../../components/MealSection/MealSection';
import NutritionSummary from '../../components/NutritionSummary/NutritionSummary';
import { useNutrition } from '../../context/NutritionContext';
import './DailyLog.css';

/**
 * DailyLog container component manages all meal sections and the overall daily food log
 */
const DailyLog = () => {
  const { resetDay } = useNutrition();

  const handleResetDay = () => {
    if (window.confirm("Are you sure you want to reset all meals for today? This action cannot be undone.")) {
      resetDay();
    }
  };

  return (
    <div className="daily-log-container">
      <div className="daily-log-header">
        <h2 className="daily-log-title">Today's Food Log</h2>
        <button 
          className="reset-day-btn"
          onClick={handleResetDay}
          aria-label="Reset day"
          title="Reset all meals for today"
        >
          Reset Day
        </button>
      </div>

      <NutritionSummary />

      <div className="meal-sections">
        <MealSection 
          mealType="breakfast" 
          title="Breakfast" 
          icon="🍳"
        />
        <MealSection 
          mealType="lunch" 
          title="Lunch" 
          icon="🥗"
        />
        <MealSection 
          mealType="dinner" 
          title="Dinner" 
          icon="🍽️"
        />
        <MealSection 
          mealType="snacks" 
          title="Snacks" 
          icon="🍌"
        />
      </div>
    </div>
  );
};

export default DailyLog;
