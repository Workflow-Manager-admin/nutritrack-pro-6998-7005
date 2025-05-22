import React, { createContext, useState, useContext, useEffect } from 'react';
import { calculateDailyTotals, defaultRecommendedDailyValues } from '../utils/nutritionUtils';

// Create the context
const NutritionContext = createContext();

// Custom hook to use the nutrition context
export const useNutrition = () => {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
};

// Provider component
export const NutritionProvider = ({ children }) => {
  // State for meals: breakfast, lunch, dinner, snacks
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  });

  // State for tracked nutritional totals
  const [nutritionTotals, setNutritionTotals] = useState({
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
  });

  // State for daily targets (can be customized by user)
  const [dailyTargets, setDailyTargets] = useState(defaultRecommendedDailyValues);

  // Update totals whenever meals change
  useEffect(() => {
    const totals = calculateDailyTotals(meals);
    setNutritionTotals(totals);
  }, [meals]);

  // Add a food item to a meal
  const addFoodToMeal = (mealType, food, servingSize) => {
    setMeals(prevMeals => ({
      ...prevMeals,
      [mealType]: [
        ...prevMeals[mealType],
        {
          id: Date.now(), // unique ID for this food entry
          food,
          servingSize,
          addedAt: new Date()
        }
      ]
    }));
  };

  // Remove a food item from a meal
  const removeFoodFromMeal = (mealType, itemId) => {
    setMeals(prevMeals => ({
      ...prevMeals,
      [mealType]: prevMeals[mealType].filter(item => item.id !== itemId)
    }));
  };

  // Update serving size for a food item
  const updateServingSize = (mealType, itemId, newServingSize) => {
    setMeals(prevMeals => ({
      ...prevMeals,
      [mealType]: prevMeals[mealType].map(item => 
        item.id === itemId ? { ...item, servingSize: newServingSize } : item
      )
    }));
  };

  // Clear all items from a meal
  const clearMeal = (mealType) => {
    setMeals(prevMeals => ({
      ...prevMeals,
      [mealType]: []
    }));
  };

  // Update daily nutrition targets
  const updateDailyTargets = (newTargets) => {
    setDailyTargets(prevTargets => ({
      ...prevTargets,
      ...newTargets
    }));
  };

  // Reset all meals for a new day
  const resetDay = () => {
    setMeals({
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: []
    });
  };

  // Value provided to consumers of this context
  const value = {
    meals,
    nutritionTotals,
    dailyTargets,
    addFoodToMeal,
    removeFoodFromMeal,
    updateServingSize,
    clearMeal,
    updateDailyTargets,
    resetDay,
  };

  return (
    <NutritionContext.Provider value={value}>
      {children}
    </NutritionContext.Provider>
  );
};

export default NutritionContext;
