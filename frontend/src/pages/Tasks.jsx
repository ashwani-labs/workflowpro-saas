import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { TASK_STATUS } from '../utils/constants.js'

// Mock API function - replace with actual API call
const fetchTasks = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    { id: 1, title: 'Design Homepage', description: 'Create mockups for homepage', status: 'IN_PROGRESS', priority: 'HIGH' },
    { id: 2, title: 'API Documentation', description: 'Write comprehensive API docs', status: 'TODO', priority: 'MEDIUM' },
    { id: 3, title: 'User Testing', description: 'Conduct user testing sessions', status: 'COMPLETED', priority: 'LOW' },
    { id: 4, title: 'Bug Fixes', description: 'Fix critical bugs in production', status: 'IN_PROGRESS', priority: 'URGENT' },
    { id: 5, title: 'Database Optimization', description: 'Optimize database queries', status: 'TODO', priority: 'MEDIUM' },
  ]
}

const Tasks = () => {
  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  })

  const getStatusClass = (status) => {
    switch (status) {
      case TASK_STATUS.TODO:
        return 'status-todo'
      case TASK_STATUS.IN_PROGRESS:
        return 'status-in-progress'
      case TASK_STATUS.COMPLETED:
        return 'status-completed'
      case TASK_STATUS.CANCELLED:
        return 'status-cancelled'
      default:
        return 'status-todo'
    }
  }

  if (isLoading) return <div>Loading tasks...</div>
  if (error) return <div>Error loading tasks: {error.message}</div>

  return (
    <div>
      <div className="list-header">
        <h2>Tasks</h2>
        <button className="btn-add">Add Task</button>
      </div>

      <div className="list-container">
        {tasks?.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <p>No tasks found. Create your first task!</p>
          </div>
        ) : (
          tasks?.map((task) => (
            <div key={task.id} className="list-item">
              <div>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <small style={{ color: '#7f8c8d' }}>Priority: {task.priority}</small>
              </div>
              <div>
                <span className={`status-badge ${getStatusClass(task.status)}`}>
                  {task.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Tasks
