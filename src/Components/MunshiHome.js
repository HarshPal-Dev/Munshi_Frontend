import React, { useState } from 'react';

const MunshiHome = () => {
  const [rollNo, setRollNo] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState('');
  const [extraItems, setExtraItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [isOnBreak, setIsOnBreak] = useState(false);

  const handleRollNoChange = (e) => {
    setRollNo(e.target.value);
  };

  const handleSearch = async () => {
    try {
      // First, check if student is on a meal break
      const mealBreakResponse = await fetch(`/api/mealbreak/${rollNo}`);
      const mealBreakData = await mealBreakResponse.json();

      const today = new Date();
      const breakStart = new Date(mealBreakData.startDate);
      const breakEnd = new Date(mealBreakData.endDate);

      if (today >= breakStart && today <= breakEnd) {
        setIsOnBreak(true);
        setStudentData(null); // Clear student data if on break
        setSelectedMeal('');
        setExtraItems([]);
        setTotalCost(0);
        return; // Exit function early if on break
      } else {
        setIsOnBreak(false);
      }

      // Fetch student data based on roll number
      const studentResponse = await fetch(`/api/student/${rollNo}`);
      const studentData = await studentResponse.json();
      setStudentData(studentData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleMealChange = (e) => {
    setSelectedMeal(e.target.value);
    setExtraItems([]);
    setTotalCost(0);
  };

  const handleExtraItemChange = (e, itemName) => {
    const { checked } = e.target;
    const item = mealOptions[selectedMeal].find((item) => item.name === itemName);

    if (checked) {
      setExtraItems([...extraItems, { item: itemName, quantity: 1, price: item.price }]);
      setTotalCost(totalCost + item.price);
    } else {
      const itemToRemove = extraItems.find((extra) => extra.item === itemName);
      setExtraItems(extraItems.filter((extra) => extra.item !== itemName));
      setTotalCost(totalCost - itemToRemove.quantity * itemToRemove.price);
    }
  };

  const handleQuantityChange = (e, itemName) => {
    const quantity = parseInt(e.target.value, 10);
    const extraItem = extraItems.find((extra) => extra.item === itemName);
    const priceDifference = extraItem.price * (quantity - extraItem.quantity);

    setExtraItems(
      extraItems.map((extra) =>
        extra.item === itemName ? { ...extra, quantity: quantity } : extra
      )
    );
    setTotalCost(totalCost + priceDifference);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      rollNo,
      selectedMeal,
      extraItems,
      totalCost,
    };

    let apiUrl = '';

    switch (selectedMeal) {
      case 'breakfast':
        apiUrl = '/api/submit-breakfast';
        break;
      case 'lunch':
        apiUrl = '/api/submit-lunch';
        break;
      case 'snacks':
        apiUrl = '/api/submit-snacks';
        break;
      case 'dinner':
        apiUrl = '/api/submit-dinner';
        break;
      default:
        console.error('Invalid meal type');
        return;
    }

    // API call - replace with your actual API endpoint
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form data submitted successfully:', formData);
        // Handle successful submission (e.g., show a success message, clear form, etc.)
      } else {
        console.error('Failed to submit form data');
        // Handle submission failure (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
      // Handle error during submission (e.g., show an error message)
    }
  };

  const mealOptions = {
    breakfast: [
      { name: 'Peanut Butter', price: 10 },
      { name: 'Bread', price: 5 },
      { name: 'Milk', price: 8 },
      { name: 'Milk Packet', price: 12 },
      { name: 'Banana', price: 4 },
      { name: 'Extra Meal', price: 20 },
    ],
    lunch: [
      { name: 'Lassi', price: 15 },
      { name: 'Dahi', price: 10 },
      { name: 'Milk Packet', price: 12 },
      { name: 'Banana', price: 4 },
      { name: 'Juice', price: 20 },
      { name: 'Extra Meal', price: 25 },
    ],
    snacks: [
      { name: 'Chips', price: 10 },
      { name: 'Juice', price: 15 },
      { name: 'Biscuit', price: 5 },
      { name: 'Extra Meal', price: 20 },
    ],
    dinner: [
      { name: 'Chips', price: 10 },
      { name: 'Biscuit', price: 5 },
      { name: 'Sweet', price: 8 },
      { name: 'Dahi', price: 10 },
      { name: 'Milk Packet', price: 12 },
      { name: 'Juice', price: 15 },
      { name: 'Extra Meal', price: 25 },
    ],
  };

  return (
    <div>
      <h1>Munshi Home Page</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Roll No."
          value={rollNo}
          onChange={handleRollNoChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {isOnBreak ? (
        <div className="break-message">
          <h2>You are currently on a meal break.</h2>
          <p>Please check back later.</p>
        </div>
      ) : studentData ? (
        <div className="student-details">
          <h2>Student Details</h2>
          <p>Name: {studentData.name}</p>
          <p>Roll No: {studentData.rollNo}</p>
          {/* Add other student details if needed */}
          <form onSubmit={handleSubmit}>
            <h3>Select Meal</h3>
            <div>
              <label>
                <input
                  type="radio"
                  name="meal"
                  value="breakfast"
                  checked={selectedMeal === 'breakfast'}
                  onChange={handleMealChange}
                />
                Breakfast
              </label>
              <label>
                <input
                  type="radio"
                  name="meal"
                  value="lunch"
                  checked={selectedMeal === 'lunch'}
                  onChange={handleMealChange}
                />
                Lunch
              </label>
              <label>
                <input
                  type="radio"
                  name="meal"
                  value="snacks"
                  checked={selectedMeal === 'snacks'}
                  onChange={handleMealChange}
                />
                Snacks
              </label>
              <label>
                <input
                  type="radio"
                  name="meal"
                  value="dinner"
                  checked={selectedMeal === 'dinner'}
                  onChange={handleMealChange}
                />
                Dinner
              </label>
            </div>
            {selectedMeal && (
              <div>
                <h3>Extra Items</h3>
                {mealOptions[selectedMeal].map((item) => (
                  <div key={item.name}>
                    <label>
                      <input
                        type="checkbox"
                        value={item.name}
                        checked={extraItems.some((extra) => extra.item === item.name)}
                        onChange={(e) => handleExtraItemChange(e, item.name)}
                      />
                      {item.name} (₹{item.price})
                    </label>
                    {extraItems.some((extra) => extra.item === item.name) && (
                      <select
                        value={extraItems.find((extra) => extra.item === item.name).quantity}
                        onChange={(e) => handleQuantityChange(e, item.name)}
                      >
                        {[...Array(10).keys()].map((num) => (
                          <option key={num + 1} value={num + 1}>{num + 1}</option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            )}
            <h3>Total Cost: ₹{totalCost}</h3>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <p>Please enter a valid roll number and click Search.</p>
      )}
    </div>
  );
};

export default MunshiHome;
