import React from 'react'

const Dashboard = () => {
  // Mock data - replace with actual data from API
  const stats = {
    totalProjects: 12,
    completedProjects: 8,
    totalTasks: 45,
    completedTasks: 32,
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to WorkFlowPro! Here's your project overview.</p>
      
      <div className="dashboard">
        <div className="stat-card">
          <h3>Total Projects</h3>
          <div className="number">{stats.totalProjects}</div>
        </div>
        <div className="stat-card">
          <h3>Completed Projects</h3>
          <div className="number">{stats.completedProjects}</div>
        </div>
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <div className="number">{stats.totalTasks}</div>
        </div>
        <div className="stat-card">
          <h3>Completed Tasks</h3>
          <div className="number">{stats.completedTasks}</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
