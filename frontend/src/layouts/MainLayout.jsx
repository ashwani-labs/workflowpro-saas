import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

/**
 * Main layout component for WorkFlowPro.
 * Layout for authenticated pages with header and navigation.
 */
const MainLayout = ({ children }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #ddd', padding: '1rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>WorkFlowPro</h1>
          <button onClick={handleLogout} className="btn btn-primary">
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#f8f9fa', borderTop: '1px solid #ddd', padding: '1rem', textAlign: 'center' }}>
        <p style={{ margin: 0, color: '#666' }}>© 2024 WorkFlowPro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
