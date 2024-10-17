import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Make sure to import the CSS file

const SignUpForm = ({ onAuthenticate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to sign up. Please try again.');
        }
      })
      .then((data) => {
        console.log('User signed up successfully:', data);

        if (onAuthenticate) {
          onAuthenticate();
        }

        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Sign up failed. Please try again.');
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="signup-title">Create Your Account</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-input"
          />
          <button type="submit" className="submit-button">Sign Up</button>
        </form>
        <p className="signin-link">
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
