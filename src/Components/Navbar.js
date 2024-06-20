
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Add CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contact-us">Contact Us</Link>
        </li>
        <li>
          <Link to="/meal-break">Meal Break</Link>
        </li>
        <li>
          <Link to="/meal-history">Meal History</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;