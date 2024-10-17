import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Make sure to import the CSS file

const SignInForm = ({ onAuthenticate }) => {
  const [formData, setFormData] = useState({
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

    fetch('http://localhost:5000/users')
      .then((response) => response.json())
      .then((users) => {
        const user = users.find(
          (u) => u.email === formData.email && u.password === formData.password
        );
        
        if (user) {
          console.log('User signed in successfully:', user);
          if (onAuthenticate) {
            onAuthenticate();  // This sets isAuthenticated to true
          }
          navigate('/dashboard');
        } else {
          setError('Invalid email or password.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Failed to sign in. Please try again.');
      });
  };

  return (
    <div className="signin-container">
      <div className="signin-form">
        <h2 className="signin-title">Sign In</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="form">
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
          <button type="submit" className="submit-button">Sign In</button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
