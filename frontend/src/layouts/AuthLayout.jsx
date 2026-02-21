import React from 'react';

/**
 * Auth layout component for WorkFlowPro.
 * Simple layout for authentication pages.
 */
const AuthLayout = ({ children }) => {
  return (
    <div className="flex-center" style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
