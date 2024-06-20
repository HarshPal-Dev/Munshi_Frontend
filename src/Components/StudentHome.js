import React, { useEffect, useState } from 'react';

const StudentHome = () => {
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    snacks: [],
    dinner: []
  });
  const [balance, setBalance] = useState(25000);
  const [balanceAdjusted, setBalanceAdjusted] = useState(false);
  const [onBreak, setOnBreak] = useState(false); // State to track if on meal break

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const breakfastResponse = await fetch('/api/meals/breakfast');
        const lunchResponse = await fetch('/api/meals/lunch');
        const snacksResponse = await fetch('/api/meals/snacks');
        const dinnerResponse = await fetch('/api/meals/dinner');

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

        // Check if current date is within meal break range
        const mealBreakResponse = await fetch('/api/mealbreak');
        const mealBreakData = await mealBreakResponse.json();
        const today = new Date();
        const breakStart = new Date(mealBreakData.startDate);
        const breakEnd = new Date(mealBreakData.endDate);

        if (today >= breakStart && today <= breakEnd) {
          setOnBreak(true);
        }

        if (
          !balanceAdjusted &&
          mealsData.breakfast.length > 0 &&
          mealsData.lunch.length > 0 &&
          mealsData.snacks.length > 0 &&
          mealsData.dinner.length > 0
        ) {
          let newBalance = 25000;

          Object.keys(mealsData).forEach(mealType => {
            const mealItems = mealsData[mealType];
            if (mealItems.length > 0) {
              newBalance -= defaultMealPrices[mealType]; // Reduce default meal cost
              mealItems.forEach(item => {
                newBalance -= item.TotalCost; // Reduce total cost of extra items for this meal type
              });
            }
          });

          setBalance(newBalance);
          setBalanceAdjusted(true); // Set the flag to true to prevent further adjustments
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMeals();
  }, [balanceAdjusted]);

  return (
    <div>
      <h1>Student Home Page</h1>
      <div className="balance">
        <h2>Balance Left: ₹{balance}</h2>
      </div>
      {onBreak ? (
        <div className="meal-break-message">
          <h2>You are on a meal break</h2>
          <p>Enjoy your break!</p>
        </div>
      ) : (
        <div className="meals">
          <h2>Today's Meals</h2>
          <div className="meal-section">
            <h3>Breakfast</h3>
            <ul>
              {meals.breakfast.length > 0 ? (
                meals.breakfast.map((item, index) => (
                  <li key={index}>{item.name} - ₹{item.price} x {item.quantity}</li>
                ))
              ) : (
                <li>No items yet</li>
              )}
            </ul>
          </div>
          <div className="meal-section">
            <h3>Lunch</h3>
            <ul>
              {meals.lunch.length > 0 ? (
                meals.lunch.map((item, index) => (
                  <li key={index}>{item.name} - ₹{item.price} x {item.quantity}</li>
                ))
              ) : (
                <li>No items yet</li>
              )}
            </ul>
          </div>
          <div className="meal-section">
            <h3>Snacks</h3>
            <ul>
              {meals.snacks.length > 0 ? (
                meals.snacks.map((item, index) => (
                  <li key={index}>{item.name} - ₹{item.price} x {item.quantity}</li>
                ))
              ) : (
                <li>No items yet</li>
              )}
            </ul>
          </div>
          <div className="meal-section">
            <h3>Dinner</h3>
            <ul>
              {meals.dinner.length > 0 ? (
                meals.dinner.map((item, index) => (
                  <li key={index}>{item.name} - ₹{item.price} x {item.quantity}</li>
                ))
              ) : (
                <li>No items yet</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentHome;
