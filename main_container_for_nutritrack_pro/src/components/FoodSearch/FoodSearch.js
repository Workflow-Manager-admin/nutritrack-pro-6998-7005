import React, { useState, useRef, useEffect } from 'react';
import { searchFoods } from '../../data/foodDatabase';
import './FoodSearch.css';

/**
 * FoodSearch component allows users to search the food database
 * and select items to add to their meals
 */
const FoodSearch = ({ onFoodSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [servingSize, setServingSize] = useState('');
  const searchRef = useRef(null);
  const resultsRef = useRef(null);

  // Search for foods when searchTerm changes
  useEffect(() => {
    if (searchTerm.trim().length > 1) {
      const results = searchFoods(searchTerm);
      setSearchResults(results);
      setIsDropdownOpen(results.length > 0);
    } else {
      setSearchResults([]);
      setIsDropdownOpen(false);
    }
  }, [searchTerm]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFoodClick = (food) => {
    setSelectedFoodId(food.id);
    setServingSize(food.servingSize.toString());
    setSearchTerm(food.name);
    setIsDropdownOpen(false);
  };

  const handleServingSizeChange = (e) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(parseFloat(value)) && parseFloat(value) > 0)) {
      setServingSize(value);
    }
  };

  const handleAddFood = () => {
    const selectedFood = searchResults.find(food => food.id === selectedFoodId);
    if (selectedFood && servingSize) {
      onFoodSelect(selectedFood, parseFloat(servingSize));
      // Reset form after adding
      setSearchTerm('');
      setSelectedFoodId(null);
      setServingSize('');
    }
  };

  return (
    <div className="food-search-container" ref={searchRef}>
      <div className="food-search-input-group">
        <input
          type="text"
          className="food-search-input"
          placeholder="Search for food..."
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => searchTerm.trim().length > 1 && setIsDropdownOpen(true)}
        />
        
        {selectedFoodId && (
          <div className="serving-size-input-group">
            <input
              type="text"
              className="serving-size-input"
              placeholder="Serving"
              value={servingSize}
              onChange={handleServingSizeChange}
            />
            <span className="serving-unit">
              {searchResults.find(food => food.id === selectedFoodId)?.servingUnit || 'g'}
            </span>
          </div>
        )}
        
        <button 
          className="add-food-btn"
          onClick={handleAddFood}
          disabled={!selectedFoodId || !servingSize}
        >
          Add
        </button>
      </div>

      {isDropdownOpen && searchResults.length > 0 && (
        <div className="search-results" ref={resultsRef}>
          {searchResults.map(food => (
            <div 
              key={food.id}
              className={`food-result ${selectedFoodId === food.id ? 'selected' : ''}`}
              onClick={() => handleFoodClick(food)}
            >
              <div className="food-result-name">{food.name}</div>
              <div className="food-result-info">
                <span className="food-serving">
                  {food.servingSize} {food.servingUnit}
                </span>
                <span className="food-calories">
                  {food.calories} cal
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodSearch;
