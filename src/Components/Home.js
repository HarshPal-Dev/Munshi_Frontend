import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={() => navigate('/signup-student')}>Sign up as Student</button>
      <button onClick={() => navigate('/login-student')}>Login as Student</button>
      <button onClick={() => navigate('/login-munshi')}>Login as Munshi</button>
    </div>
  );
};

export default Home;
