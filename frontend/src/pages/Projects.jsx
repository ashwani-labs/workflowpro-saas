import { motion } from 'framer-motion'
import Card from '../components/Card'

const Projects = () => {
  const projects = [
    { name: 'Website Redesign', status: 'In Progress', progress: 75, team: 4 },
    { name: 'Mobile App Development', status: 'Planning', progress: 25, team: 6 },
    { name: 'Marketing Campaign', status: 'Completed', progress: 100, team: 3 },
    { name: 'Database Migration', status: 'In Progress', progress: 60, team: 2 },
    { name: 'API Integration', status: 'Planning', progress: 10, team: 5 }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-100'
      case 'In Progress': return 'text-blue-600 bg-blue-100'
      case 'Planning': return 'text-yellow-600 bg-yellow-100'
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
        Projects
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-secondary">
                <span>👥 {project.team} members</span>
                <button className="text-accent-color hover:underline">
                  View Details →
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Projects
