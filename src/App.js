import React from 'react';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

// Import your page components
import LoginStudent from './Components/LoginStudent';
import SignupStudent from './Components/SignupStudent';
import MunshiHome from './Components/MunshiHome';
import LoginMunshi from './Components/MunshiLogin';
import History from './Components/History';
import MealBreak from './Components/MealBreak';
import Home from './Components/Home';
import Navbar from './Components/Navbar'
import StudentHome from './Components/StudentHome'



function App() {
  return (
   <div>
     <Routes>
      <div className="App">
        {/* Define your routes */}
        <Route path="/" component={Home} />
        <Route path="/home-student" component={StudentHome} />
        <Route path="/login-student" component={LoginStudent} />
        <Route path="/signup-student" component={SignupStudent} />
        <Route path="/munshi-home" component={MunshiHome} />
        <Route path="/login-munshi" component={LoginMunshi} />
        <Route path="/history" component={History} />
        <Route path="/meal-break" component={MealBreak} />
        <Route path="/student-home" element={<StudentHome />} /> 
        {/* Add a default route */}
      </div> {/* Closing tag for div with className="App" */}
      <div>
        <h1>Welcome to My App!</h1>
        {/* Additional content */}
      </div>
    </Routes>
   </div>
  );
}

export default App;
