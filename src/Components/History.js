import React, { useState } from 'react';

const MealSearch = () => {
  const [date, setDate] = useState('');
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    snacks: [],
    dinner: []
  });
  const [totalCosts, setTotalCosts] = useState({
    breakfast: 0,
    lunch: 0,
    snacks: 0,
    dinner: 0
  });

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const breakfastResponse = await fetch(`/api/meals/breakfast?date=${date}`);
      const lunchResponse = await fetch(`/api/meals/lunch?date=${date}`);
      const snacksResponse = await fetch(`/api/meals/snacks?date=${date}`);
      const dinnerResponse = await fetch(`/api/meals/dinner?date=${date}`);

      const breakfastData = await breakfastResponse.json();
      const lunchData = await lunchResponse.json();
      const snacksData = await snacksResponse.json();
      const dinnerData = await dinnerResponse.json();

      const mealsData = {
        breakfast: breakfastData,
        lunch: lunchData,
        snacks: snacksData,
        dinner: dinnerData
      };

      setMeals(mealsData);

      const calculateTotalCost = (mealType) => {
        return mealType.reduce((total, item) => total + item.price * item.quantity, 0);
      };

      setTotalCosts({
        breakfast: calculateTotalCost(breakfastData),
        lunch: calculateTotalCost(lunchData),
        snacks: calculateTotalCost(snacksData),
        dinner: calculateTotalCost(dinnerData)
      });
    } catch (error) {
      console.error('Error fetching meals data:', error);
    }
  };

  return (
    <div>
      <h1>Meal Search</h1>
      <div>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="meals">
        <h2>Meals on {date}</h2>
        <div className="meal-section">
          <h3>Breakfast</h3>
          <ul>
            {meals.breakfast.length > 0 ? (
              meals.breakfast.map((item, index) => (
                <li key={index}>{item.name} - ₹{item.price} x {item.quantity}</li>
              ))
            ) : (
              <li>No items</li>
            )}
          </ul>
          <p>Total Cost: ₹{totalCosts.breakfast}</p>
        </div>
        <div className="meal-section">
          <h3>Lunch</h3>
          <ul>
            {meals.lunch.length > 0 ? (
              meals.lunch.map((item, index) => (
                <li key={index}>{item.name} - ₹{item.price} x {item.quantity}</li>
              ))
            ) : (
              <li>No items</li>
            )}
          </ul>
          <p>Total Cost: ₹{totalCosts.lunch}</p>
        </div>
        <div className="meal-section">
          <h3>Snacks</h3>
          <ul>
            {meals.snacks.length > 0 ? (
              meals.snacks.map((item, index) => (
                <li key={index}>{item.name} - ₹{item.price} x {item.quantity}</li>
              ))
            ) : (
              <li>No items</li>
            )}
          </ul>
          <p>Total Cost: ₹{totalCosts.snacks}</p>
        </div>
        <div className="meal-section">
          <h3>Dinner</h3>
          <ul>
            {meals.dinner.length > 0 ? (
              meals.dinner.map((item, index) => (
                <li key={index}>{item.name} - ₹{item.price} x {item.quantity}</li>
              ))
            ) : (
              <li>No items</li>
            )}
          </ul>
          <p>Total Cost: ₹{totalCosts.dinner}</p>
        </div>
      </div>
    </div>
  );
};

export default MealSearch;
