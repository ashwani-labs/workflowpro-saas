import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

// Mock API function - replace with actual API call
const fetchProjects = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    { id: 1, name: 'Website Redesign', description: 'Complete redesign of company website', status: 'In Progress' },
    { id: 2, name: 'Mobile App', description: 'Native mobile app development', status: 'Planning' },
    { id: 3, name: 'API Integration', description: 'Third-party API integration', status: 'Completed' },
  ]
}

const Projects = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  })

  if (isLoading) return <div>Loading projects...</div>
  if (error) return <div>Error loading projects: {error.message}</div>

  return (
    <div>
      <div className="list-header">
        <h2>Projects</h2>
        <button 
          className="btn-add"
          onClick={() => setIsFormOpen(true)}
        >
          Add Project
        </button>
      </div>

      <div className="list-container">
        {projects?.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <p>No projects found. Create your first project!</p>
          </div>
        ) : (
          projects?.map((project) => (
            <div key={project.id} className="list-item">
              <div>
                <h4>{project.name}</h4>
                <p>{project.description}</p>
              </div>
              <div>
                <span className="status-badge status-in-progress">
                  {project.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {isFormOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h3>Add New Project</h3>
            <form>
              <div className="form-group">
                <label>Project Name</label>
                <input type="text" placeholder="Enter project name" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Enter project description" rows="3" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="btn">Create Project</button>
                <button 
                  type="button" 
                  className="btn" 
                  style={{ backgroundColor: '#95a5a6' }}
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects
