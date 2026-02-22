import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <div className="sidebar">
      <h3>WorkFlowPro</h3>
      <ul>
        <li>
          <NavLink 
            to="/dashboard" 
            className={isActive('/dashboard') ? 'active' : ''}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/projects" 
            className={isActive('/projects') ? 'active' : ''}
          >
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/tasks" 
            className={isActive('/tasks') ? 'active' : ''}
          >
            Tasks
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
