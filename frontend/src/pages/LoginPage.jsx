import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';

/**
 * Login page component for WorkFlowPro.
 * Simple login form with email and password fields.
 */
const LoginPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Dispatch login credentials
    // In a real app, this would make an API call first
    dispatch(setCredentials({
      user: { id: 1, email: formData.email, name: 'John Doe' },
      token: 'mock-jwt-token',
      tenantId: 'tenant-123',
    }));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h2>Login to WorkFlowPro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
