import { motion } from 'framer-motion'
import Card from '../components/Card'

const Dashboard = () => {
  const stats = [
    { title: 'Total Projects', value: '12', icon: '📁', color: 'from-blue-500 to-blue-600' },
    { title: 'Active Tasks', value: '48', icon: '✅', color: 'from-green-500 to-green-600' },
    { title: 'Team Members', value: '8', icon: '👥', color: 'from-purple-500 to-purple-600' },
    { title: 'Completed', value: '156', icon: '🎯', color: 'from-orange-500 to-orange-600' }
  ]

  return (
    <div>
      <motion.h1 
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary text-sm mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-xl`}>
                  {stat.icon}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
            <div className="space-y-3">
              {['Website Redesign', 'Mobile App', 'Marketing Campaign'].map((project, index) => (
                <div key={project} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <span>{project}</span>
                  <span className="text-sm text-secondary">Active</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <h2 className="text-xl font-semibold mb-4">Upcoming Tasks</h2>
            <div className="space-y-3">
              {['Design Review', 'Client Meeting', 'Code Deployment'].map((task, index) => (
                <div key={task} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <span>{task}</span>
                  <span className="text-sm text-secondary">Today</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
