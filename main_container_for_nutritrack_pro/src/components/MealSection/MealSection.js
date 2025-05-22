import React, { useState } from 'react';
import FoodItem from '../FoodItem/FoodItem';
import FoodSearch from '../FoodSearch/FoodSearch';
import { useNutrition } from '../../context/NutritionContext';
import { formatDecimal } from '../../utils/nutritionUtils';
import './MealSection.css';

/**
 * MealSection component manages food items for a specific meal type
 * (breakfast, lunch, dinner, snacks)
 */
const MealSection = ({ mealType, title, icon }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  const { 
    meals, 
    addFoodToMeal, 
    removeFoodFromMeal, 
    updateServingSize, 
    clearMeal 
  } = useNutrition();

  const mealItems = meals[mealType] || [];

  // Calculate meal nutrition totals
  const mealTotals = mealItems.reduce((totals, item) => {
    const multiplier = item.servingSize / item.food.servingSize;
    
    return {
      calories: totals.calories + (item.food.calories * multiplier),
      proteins: totals.proteins + (item.food.proteins * multiplier),
      carbs: totals.carbs + (item.food.carbs * multiplier),
      fats: totals.fats + (item.food.fats * multiplier),
    };
  }, { calories: 0, proteins: 0, carbs: 0, fats: 0 });

  const handleFoodSelect = (food, servingSize) => {
    addFoodToMeal(mealType, food, servingSize);
    setIsAdding(false);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClearMeal = () => {
    if (window.confirm(`Are you sure you want to clear all items from ${title}?`)) {
      clearMeal(mealType);
    }
  };

  return (
    <div className={`meal-section ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="meal-header" onClick={handleToggleExpand}>
        <div className="meal-title-container">
          <span className="meal-icon">{icon}</span>
          <h3 className="meal-title">{title}</h3>
        </div>
        
        <div className="meal-summary">
          <span className="meal-calories">{Math.round(mealTotals.calories)} cal</span>
          <button 
            className="expand-toggle"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? '▼' : '►'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="meal-content">
          {mealItems.length > 0 && (
            <div className="meal-nutrition-summary">
              <div className="macro-summary">
                <div className="macro-pill">
                  <span className="macro-label">Protein</span>
                  <span className="macro-value">{formatDecimal(mealTotals.proteins)}g</span>
                </div>
                <div className="macro-pill">
                  <span className="macro-label">Carbs</span>
                  <span className="macro-value">{formatDecimal(mealTotals.carbs)}g</span>
                </div>
                <div className="macro-pill">
                  <span className="macro-label">Fats</span>
                  <span className="macro-value">{formatDecimal(mealTotals.fats)}g</span>
                </div>
              </div>

              {mealItems.length > 1 && (
                <button 
                  className="clear-meal-btn"
                  onClick={handleClearMeal}
                >
                  Clear All
                </button>
              )}
            </div>
          )}

          <div className="food-items-list">
            {mealItems.map((item) => (
              <FoodItem
                key={item.id}
                foodItem={item.food}
                servingSize={item.servingSize}
                mealType={mealType}
                onRemove={() => removeFoodFromMeal(mealType, item.id)}
                onUpdateServingSize={(newSize) => updateServingSize(mealType, item.id, newSize)}
              />
            ))}
          </div>

          {isAdding ? (
            <div className="add-food-container">
              <FoodSearch onFoodSelect={handleFoodSelect} />
              <button 
                className="cancel-add-btn"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button 
              className="add-food-btn meal-add-btn"
              onClick={() => setIsAdding(true)}
            >
              + Add Food
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MealSection;
