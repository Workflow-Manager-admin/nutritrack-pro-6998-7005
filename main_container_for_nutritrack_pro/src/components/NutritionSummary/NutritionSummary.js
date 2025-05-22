import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { 
  calculatePercentage, 
  formatDecimal, 
  getNutrientColor, 
  calculateRemaining 
} from '../../utils/nutritionUtils';
import './NutritionSummary.css';

/**
 * NutritionSummary component displays the day's nutritional totals 
 * and progress towards daily targets
 */
const NutritionSummary = () => {
  const { nutritionTotals, dailyTargets } = useNutrition();
  const remaining = calculateRemaining(nutritionTotals, dailyTargets);

  const macroNutrients = [
    { 
      name: 'Calories', 
      value: Math.round(nutritionTotals.calories), 
      unit: 'kcal', 
      target: dailyTargets.calories, 
      remaining: Math.round(remaining.calories), 
      shortName: 'CAL' 
    },
    { 
      name: 'Protein', 
      value: formatDecimal(nutritionTotals.proteins), 
      unit: 'g', 
      target: dailyTargets.proteins, 
      remaining: formatDecimal(remaining.proteins),
      shortName: 'PRO' 
    },
    { 
      name: 'Carbohydrates', 
      value: formatDecimal(nutritionTotals.carbs), 
      unit: 'g', 
      target: dailyTargets.carbs, 
      remaining: formatDecimal(remaining.carbs),
      shortName: 'CARB' 
    },
    { 
      name: 'Fat', 
      value: formatDecimal(nutritionTotals.fats), 
      unit: 'g', 
      target: dailyTargets.fats, 
      remaining: formatDecimal(remaining.fats),
      shortName: 'FAT' 
    }
  ];

  // Calculate macro distribution percentages
  const totalMacroCalories = 
    (nutritionTotals.proteins * 4) + 
    (nutritionTotals.carbs * 4) + 
    (nutritionTotals.fats * 9);

  const proteinPercentage = totalMacroCalories ? 
    Math.round((nutritionTotals.proteins * 4) / totalMacroCalories * 100) : 0;
    
  const carbsPercentage = totalMacroCalories ? 
    Math.round((nutritionTotals.carbs * 4) / totalMacroCalories * 100) : 0;
    
  const fatsPercentage = totalMacroCalories ? 
    Math.round((nutritionTotals.fats * 9) / totalMacroCalories * 100) : 0;

  return (
    <div className="nutrition-summary">
      <h3 className="summary-title">Daily Nutrition</h3>
      
      <div className="macro-distribution">
        <div className="distribution-bars">
          <div 
            className="distribution-segment protein-segment" 
            style={{ width: `${proteinPercentage}%` }}
            title={`Protein: ${proteinPercentage}%`}
          />
          <div 
            className="distribution-segment carbs-segment" 
            style={{ width: `${carbsPercentage}%` }}
            title={`Carbs: ${carbsPercentage}%`}
          />
          <div 
            className="distribution-segment fats-segment" 
            style={{ width: `${fatsPercentage}%` }}
            title={`Fats: ${fatsPercentage}%`}
          />
        </div>
        
        <div className="distribution-legend">
          <div className="legend-item">
            <span className="legend-color protein-color"></span>
            <span className="legend-text">Protein {proteinPercentage}%</span>
          </div>
          <div className="legend-item">
            <span className="legend-color carbs-color"></span>
            <span className="legend-text">Carbs {carbsPercentage}%</span>
          </div>
          <div className="legend-item">
            <span className="legend-color fats-color"></span>
            <span className="legend-text">Fats {fatsPercentage}%</span>
          </div>
        </div>
      </div>

      <div className="nutrient-progress-container">
        {macroNutrients.map((nutrient, index) => (
          <div className="nutrient-progress" key={index}>
            <div className="nutrient-header">
              <div>
                <h4 className="nutrient-name">{nutrient.name}</h4>
                <div className="nutrient-values">
                  <span className="nutrient-current">
                    {nutrient.value} {nutrient.unit}
                  </span>
                  <span className="nutrient-separator">/</span>
                  <span className="nutrient-target">
                    {nutrient.target} {nutrient.unit}
                  </span>
                </div>
              </div>
              <div className="nutrient-remaining">
                <span className="remaining-label">Remaining</span>
                <span className="remaining-value">
                  {nutrient.remaining > 0 ? nutrient.remaining : 0} {nutrient.unit}
                </span>
              </div>
            </div>

            <div className="progress-bar-container">
              <div 
                className="progress-bar" 
                style={{ 
                  width: `${calculatePercentage(nutrient.value, nutrient.target)}%`,
                  backgroundColor: getNutrientColor(nutrient.value, nutrient.target) 
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="additional-nutrients">
        <h4 className="additional-heading">Additional Nutrients</h4>
        
        <div className="nutrients-grid">
          {nutritionTotals.fiber !== undefined && (
            <div className="mini-nutrient">
              <span className="mini-nutrient-name">Fiber</span>
              <span className="mini-nutrient-value">
                {formatDecimal(nutritionTotals.fiber)} / {dailyTargets.fiber} g
              </span>
            </div>
          )}
          
          {nutritionTotals.sugar !== undefined && (
            <div className="mini-nutrient">
              <span className="mini-nutrient-name">Sugar</span>
              <span className="mini-nutrient-value">
                {formatDecimal(nutritionTotals.sugar)} / {dailyTargets.sugar} g
              </span>
            </div>
          )}
          
          {nutritionTotals.sodium !== undefined && (
            <div className="mini-nutrient">
              <span className="mini-nutrient-name">Sodium</span>
              <span className="mini-nutrient-value">
                {Math.round(nutritionTotals.sodium)} / {dailyTargets.sodium} mg
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NutritionSummary;
