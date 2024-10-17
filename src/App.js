import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import UserDashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Authenticate the user by setting isAuthenticated to true
  const authenticateUser = () => {
    setIsAuthenticated(true);
    localStorage.setItem('auth', 'true');  // Save auth state to local storage
  };

  // Check if user is already authenticated (on component mount)
  useEffect(() => {
    const authStatus = localStorage.getItem('auth');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  // Custom route protection to check auth status
  const ProtectedRoute = ({ element: Component }) => {
    const authStatus = localStorage.getItem('auth');
    return authStatus === 'true' ? <Component /> : <Navigate to="/signin" />;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpForm onAuthenticate={authenticateUser} />} />
          <Route path="/signin" element={<SignInForm onAuthenticate={authenticateUser} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={UserDashboard} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
