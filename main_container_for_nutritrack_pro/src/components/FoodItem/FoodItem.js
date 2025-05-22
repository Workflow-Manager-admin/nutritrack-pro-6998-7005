import React, { useState } from 'react';
import { formatDecimal } from '../../utils/nutritionUtils';
import './FoodItem.css';

/**
 * FoodItem component displays a single food item with nutrition info
 * and allows adjusting the serving size
 */
const FoodItem = ({ 
  foodItem, 
  servingSize, 
  mealType,
  onRemove, 
  onUpdateServingSize 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newServingSize, setNewServingSize] = useState(servingSize);

  // Calculate multiplier for nutrition values based on serving size
  const multiplier = servingSize / foodItem.servingSize;

  const handleServingSizeChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setNewServingSize(value);
    }
  };

  const handleSaveServingSize = () => {
    onUpdateServingSize(newServingSize);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveServingSize();
    } else if (e.key === 'Escape') {
      setNewServingSize(servingSize);
      setIsEditing(false);
    }
  };

  return (
    <div className="food-item">
      <div className="food-item-header">
        <h4 className="food-item-name">{foodItem.name}</h4>
        <button 
          className="food-item-remove"
          onClick={onRemove}
          aria-label="Remove food item"
        >
          &times;
        </button>
      </div>
      
      <div className="food-item-serving">
        {isEditing ? (
          <div className="serving-edit">
            <input
              type="number"
              value={newServingSize}
              onChange={handleServingSizeChange}
              onKeyDown={handleKeyDown}
              autoFocus
              min="0"
              step="0.1"
            />
            <span className="serving-unit">{foodItem.servingUnit}</span>
            <button 
              className="btn-small" 
              onClick={handleSaveServingSize}
            >
              Save
            </button>
          </div>
        ) : (
          <div onClick={() => setIsEditing(true)} className="serving-display">
            <span>{servingSize} {foodItem.servingUnit}</span>
            <span className="edit-icon">✏️</span>
          </div>
        )}
      </div>
      
      <div className="food-item-nutrition">
        <div className="nutrition-value">
          <span className="nutrition-label">Calories:</span>
          <span>{Math.round(foodItem.calories * multiplier)}</span>
        </div>
        
        <div className="nutrition-macro">
          <div className="macro-value">
            <span className="macro-label">P</span>
            <span>{formatDecimal(foodItem.proteins * multiplier)}g</span>
          </div>
          <div className="macro-value">
            <span className="macro-label">C</span>
            <span>{formatDecimal(foodItem.carbs * multiplier)}g</span>
          </div>
          <div className="macro-value">
            <span className="macro-label">F</span>
            <span>{formatDecimal(foodItem.fats * multiplier)}g</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
