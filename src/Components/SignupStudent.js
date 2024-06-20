import React, { useState } from 'react';

const SignupStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    branchName: '',
    roomNo: '',
    hostelBlockName: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, including password validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Form data submitted:', formData);
  };

  return (
    <div>
      <h1>Sign Up as Student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="rollNo">Roll No.:</label>
          <input
            type="text"
            id="rollNo"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="branchName">Branch Name:</label>
          <input
            type="text"
            id="branchName"
            name="branchName"
            value={formData.branchName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="roomNo">Room No.:</label>
          <input
            type="text"
            id="roomNo"
            name="roomNo"
            value={formData.roomNo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="hostelBlockName">Hostel Block Name:</label>
          <input
            type="text"
            id="hostelBlockName"
            name="hostelBlockName"
            value={formData.hostelBlockName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupStudent;
