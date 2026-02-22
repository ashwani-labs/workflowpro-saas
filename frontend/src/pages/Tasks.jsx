import { motion } from 'framer-motion'
import Card from '../components/Card'

const Tasks = () => {
  const tasks = [
    { title: 'Design Review', project: 'Website Redesign', priority: 'High', status: 'In Progress', assignee: 'John Doe', dueDate: '2024-02-25' },
    { title: 'API Documentation', project: 'API Integration', priority: 'Medium', status: 'Todo', assignee: 'Jane Smith', dueDate: '2024-02-28' },
    { title: 'User Testing', project: 'Mobile App', priority: 'Low', status: 'Completed', assignee: 'Mike Johnson', dueDate: '2024-02-20' },
    { title: 'Database Backup', project: 'Database Migration', priority: 'High', status: 'In Progress', assignee: 'Sarah Wilson', dueDate: '2024-02-24' },
    { title: 'Code Review', project: 'Website Redesign', priority: 'Medium', status: 'Todo', assignee: 'Tom Brown', dueDate: '2024-02-27' },
    { title: 'Deployment Setup', project: 'API Integration', priority: 'High', status: 'In Progress', assignee: 'Emily Davis', dueDate: '2024-02-23' }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-100'
      case 'In Progress': return 'text-blue-600 bg-blue-100'
      case 'Todo': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div>
      <motion.h1 
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Tasks
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tasks.map((task, index) => (
          <motion.div
            key={task.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                <p className="text-secondary text-sm mb-3">{task.project}</p>
                
                <div className="flex gap-2 mb-3">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                    {task.assignee.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-secondary">{task.assignee}</span>
                </div>
                <div className="text-secondary">
                  📅 {task.dueDate}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Tasks
