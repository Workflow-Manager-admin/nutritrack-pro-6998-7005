/**
 * Utility functions for nutrition calculations and formatting
 */

/**
 * Calculate total calories from macronutrients
 */
export const calculateCalories = (proteins, carbs, fats) => {
  return proteins * 4 + carbs * 4 + fats * 9;
};

/**
 * Format number to 1 decimal place
 */
export const formatDecimal = (number) => {
  return Math.round(number * 10) / 10;
};

/**
 * Calculate percentage of current value against target
 */
export const calculatePercentage = (current, target) => {
  if (!target) return 0;
  const percentage = (current / target) * 100;
  return Math.min(percentage, 100); // Cap at 100%
};

/**
 * Default daily recommended values (grams)
 * These are general guidelines and can be customized per user
 */
export const defaultRecommendedDailyValues = {
  calories: 2000,
  proteins: 50, // grams
  carbs: 275,   // grams
  fats: 55,     // grams
  fiber: 28,    // grams
  sugar: 50,    // grams
  sodium: 2300, // mg
};

/**
 * Get nutrient color based on percentage of daily recommended value
 */
export const getNutrientColor = (current, target) => {
  const percentage = calculatePercentage(current, target);
  if (percentage < 50) return 'var(--nutrient-under)';
  if (percentage < 90) return 'var(--nutrient-good)';
  if (percentage <= 110) return 'var(--nutrient-ideal)';
  return 'var(--nutrient-over)';
};

/**
 * Calculate daily nutrient totals from meal items
 */
export const calculateDailyTotals = (meals) => {
  const initialTotals = {
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
  };

  return Object.values(meals).reduce((totals, mealItems) => {
    mealItems.forEach(item => {
      // Calculate adjusted values based on serving size
      const servingMultiplier = item.servingSize / item.food.servingSize;
      
      totals.calories += item.food.calories * servingMultiplier;
      totals.proteins += item.food.proteins * servingMultiplier;
      totals.carbs += item.food.carbs * servingMultiplier;
      totals.fats += item.food.fats * servingMultiplier;
      
      if (item.food.fiber) {
        totals.fiber += item.food.fiber * servingMultiplier;
      }
      if (item.food.sugar) {
        totals.sugar += item.food.sugar * servingMultiplier;
      }
      if (item.food.sodium) {
        totals.sodium += item.food.sodium * servingMultiplier;
      }
    });
    
    return totals;
  }, initialTotals);
};

/**
 * Calculate remaining nutrients for the day
 */
export const calculateRemaining = (totals, targets = defaultRecommendedDailyValues) => {
  const remaining = {};
  
  for (const nutrient in totals) {
    if (targets[nutrient]) {
      remaining[nutrient] = targets[nutrient] - totals[nutrient];
    }
  }
  
  return remaining;
};
