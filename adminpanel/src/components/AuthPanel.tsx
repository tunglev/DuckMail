import React, { useState, useEffect } from 'react';
import { authApi, AuthUser } from '../services/api';

interface AuthPanelProps {
  onAuthChange: (user: AuthUser | null) => void;
}

const AuthPanel: React.FC<AuthPanelProps> = ({ onAuthChange }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Form data for login
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  
  // Form data for register
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });

  // Check if user is already logged in on component mount
  useEffect(() => {
    const user = authApi.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      onAuthChange(user);
    }
  }, [onAuthChange]);

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const user = await authApi.login(loginData);
      setCurrentUser(user);
      onAuthChange(user);
      setSuccess('Logged in successfully!');
      setLoginData({ username: '', password: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Check if passwords match
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      // Remove confirmPassword field before sending to API
      const { username, email, firstName, lastName, password } = registerData;
      await authApi.register({ username, email, firstName, lastName, password });
      setSuccess('Registration successful! You can now login.');
      setIsLoginMode(true);
      setRegisterData({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authApi.logout();
    setCurrentUser(null);
    onAuthChange(null);
    setSuccess('Logged out successfully');
  };

  if (currentUser) {
    return (
      <div className="auth-panel">
        <div className="user-greeting">
          <h3>Welcome, {currentUser.firstName}!</h3>
          <p>{currentUser.email}</p>
          <button 
            onClick={handleLogout}
            className="button"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-modal">
      {success && <div className="success">{success}</div>}
      {error && <div className="error">{error}</div>}
      
      <div className="auth-tabs">
        <button 
          className={isLoginMode ? 'active' : ''}
          onClick={() => setIsLoginMode(true)}
        >
          Login
        </button>
        <button 
          className={!isLoginMode ? 'active' : ''}
          onClick={() => setIsLoginMode(false)}
        >
          Register
        </button>
      </div>
      
      {isLoginMode ? (
        // Login Form
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={loginData.username}
              onChange={handleLoginInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginInputChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      ) : (
        // Register Form
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="reg-username">Username</label>
            <input
              type="text"
              id="reg-username"
              name="username"
              value={registerData.username}
              onChange={handleRegisterInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reg-email">Email</label>
            <input
              type="email"
              id="reg-email"
              name="email"
              value={registerData.email}
              onChange={handleRegisterInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reg-firstName">First Name</label>
            <input
              type="text"
              id="reg-firstName"
              name="firstName"
              value={registerData.firstName}
              onChange={handleRegisterInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reg-lastName">Last Name</label>
            <input
              type="text"
              id="reg-lastName"
              name="lastName"
              value={registerData.lastName}
              onChange={handleRegisterInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reg-password">Password</label>
            <input
              type="password"
              id="reg-password"
              name="password"
              value={registerData.password}
              onChange={handleRegisterInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reg-confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="reg-confirmPassword"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleRegisterInputChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="button" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AuthPanel;