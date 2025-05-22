/**
 * Food database with nutritional information for common food items
 * All values are per serving size specified
 * 
 * calories: kilocalories
 * proteins, carbs, fats, fiber, sugar: grams
 * sodium: milligrams
 */

const foodDatabase = [
  {
    id: 1,
    name: "Chicken Breast",
    category: "Proteins",
    servingSize: 100, // grams
    servingUnit: "g",
    calories: 165,
    proteins: 31,
    carbs: 0,
    fats: 3.6,
    sodium: 74,
  },
  {
    id: 2,
    name: "Brown Rice",
    category: "Grains",
    servingSize: 100, // cooked
    servingUnit: "g",
    calories: 111,
    proteins: 2.6,
    carbs: 23,
    fats: 0.9,
    fiber: 1.8,
    sodium: 5,
  },
  {
    id: 3,
    name: "Broccoli",
    category: "Vegetables",
    servingSize: 100,
    servingUnit: "g",
    calories: 34,
    proteins: 2.8,
    carbs: 6.6,
    fats: 0.4,
    fiber: 2.6,
    sodium: 33,
  },
  {
    id: 4,
    name: "Whole Milk",
    category: "Dairy",
    servingSize: 240, // ml (1 cup)
    servingUnit: "ml",
    calories: 150,
    proteins: 8,
    carbs: 12,
    fats: 8,
    sugar: 12,
    sodium: 105,
  },
  {
    id: 5,
    name: "Salmon",
    category: "Proteins",
    servingSize: 100,
    servingUnit: "g",
    calories: 208,
    proteins: 20,
    carbs: 0,
    fats: 14,
    sodium: 59,
  },
  {
    id: 6,
    name: "Sweet Potato",
    category: "Vegetables",
    servingSize: 100, // cooked
    servingUnit: "g",
    calories: 90,
    proteins: 2,
    carbs: 21,
    fats: 0.1,
    fiber: 3.3,
    sugar: 6.5,
    sodium: 36,
  },
  {
    id: 7,
    name: "Eggs",
    category: "Proteins",
    servingSize: 50, // 1 medium egg
    servingUnit: "g",
    calories: 72,
    proteins: 6.3,
    carbs: 0.4,
    fats: 4.8,
    sodium: 71,
  },
  {
    id: 8,
    name: "Avocado",
    category: "Fruits",
    servingSize: 50, // 1/3 of a medium avocado
    servingUnit: "g",
    calories: 80,
    proteins: 1,
    carbs: 4.3,
    fats: 7.3,
    fiber: 3.4,
    sodium: 3,
  },
  {
    id: 9,
    name: "Greek Yogurt",
    category: "Dairy",
    servingSize: 170, // 6 oz container
    servingUnit: "g",
    calories: 100,
    proteins: 17,
    carbs: 6,
    fats: 0.7,
    sugar: 4,
    sodium: 65,
  },
  {
    id: 10,
    name: "Oatmeal",
    category: "Grains",
    servingSize: 40, // dry
    servingUnit: "g",
    calories: 150,
    proteins: 5,
    carbs: 27,
    fats: 2.5,
    fiber: 4,
    sodium: 0,
  },
  {
    id: 11,
    name: "Banana",
    category: "Fruits",
    servingSize: 118, // 1 medium banana
    servingUnit: "g",
    calories: 105,
    proteins: 1.3,
    carbs: 27,
    fats: 0.4,
    fiber: 3.1,
    sugar: 14,
    sodium: 1,
  },
  {
    id: 12,
    name: "Almonds",
    category: "Nuts and Seeds",
    servingSize: 28, // 1 oz
    servingUnit: "g",
    calories: 164,
    proteins: 6,
    carbs: 6,
    fats: 14,
    fiber: 3.5,
    sodium: 0,
  },
  {
    id: 13,
    name: "Quinoa",
    category: "Grains",
    servingSize: 100, // cooked
    servingUnit: "g",
    calories: 120,
    proteins: 4.4,
    carbs: 21,
    fats: 1.9,
    fiber: 2.8,
    sodium: 7,
  },
  {
    id: 14,
    name: "Spinach",
    category: "Vegetables",
    servingSize: 30, // 1 cup raw
    servingUnit: "g",
    calories: 7,
    proteins: 0.9,
    carbs: 1.1,
    fats: 0.1,
    fiber: 0.7,
    sodium: 23,
  },
  {
    id: 15,
    name: "Olive Oil",
    category: "Oils",
    servingSize: 13.5, // 1 tablespoon
    servingUnit: "ml",
    calories: 119,
    proteins: 0,
    carbs: 0,
    fats: 13.5,
    sodium: 0,
  },
];

export const getFoodById = (id) => {
  return foodDatabase.find(item => item.id === id);
};

export const searchFoods = (query) => {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return [];
  
  return foodDatabase.filter(food => 
    food.name.toLowerCase().includes(normalizedQuery) || 
    food.category.toLowerCase().includes(normalizedQuery)
  );
};

export const getFoodByCategory = (category) => {
  if (!category) return foodDatabase;
  return foodDatabase.filter(food => food.category === category);
};

export const getCategories = () => {
  const categories = new Set();
  foodDatabase.forEach(food => categories.add(food.category));
  return Array.from(categories);
};

export default foodDatabase;
