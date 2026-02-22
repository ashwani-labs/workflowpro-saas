# WorkFlowPro Frontend

A production-ready React frontend for the WorkFlowPro project management SaaS application.

## Tech Stack

- **React 18** - UI library with functional components
- **Vite** - Fast build tool and development server
- **Redux Toolkit** - State management
- **React Query (TanStack Query)** - Server state management
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **CSS** - Plain CSS with modular design

## Features

- 🏗️ **Clean Architecture** - Modular, scalable folder structure
- 🔐 **Authentication** - Login/logout with JWT token management
- 🛡️ **Protected Routes** - Route protection based on auth status
- 📊 **Dashboard** - Project and task statistics
- 📋 **Project Management** - View and manage projects
- ✅ **Task Management** - Track tasks with status and priority
- 🎨 **Responsive Design** - Modern, clean UI with sidebar navigation
- 🔄 **State Management** - Redux for global state, React Query for server state
- 🚀 **Production Ready** - Optimized build with code splitting

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd workflowpro-frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8080/api
```

## Project Structure

```text
src/
├── app/
│   └── store.js              # Redux store configuration
├── api/
│   └── axios.js               # Axios configuration with interceptors
├── features/
│   ├── auth/
│   │   ├── authSlice.js       # Auth state management
│   │   └── authApi.js         # Auth API calls
│   ├── projects/
│   │   ├── projectSlice.js    # Project state management
│   │   └── projectApi.js      # Project API calls
│   └── tasks/
│       ├── taskSlice.js       # Task state management
│       └── taskApi.js         # Task API calls
├── pages/
│   ├── LoginPage.jsx          # Login page
│   ├── Dashboard.jsx          # Dashboard with statistics
│   ├── Projects.jsx           # Project management page
│   └── Tasks.jsx              # Task management page
├── components/
│   ├── Navbar.jsx             # Top navigation bar
│   ├── Sidebar.jsx            # Side navigation
│   └── ProtectedRoute.jsx     # Route protection component
├── hooks/
│   └── useAuth.js             # Custom auth hook
├── layouts/
│   └── MainLayout.jsx         # Main application layout
├── routes/
│   └── AppRoutes.jsx          # Application routing
├── utils/
│   └── constants.js           # Application constants
├── App.jsx                    # Root App component
├── main.jsx                   # Application entry point
└── index.css                  # Global styles
```

## Key Features

### Authentication

- JWT token-based authentication
- Token stored in localStorage
- Automatic token injection in API calls
- Auto-logout on token expiration
- Protected routes with redirect to login

### State Management

- **Redux Toolkit** for global state (auth, projects, tasks)
- **React Query** for server state with caching and synchronization
- Custom hooks for easy state access

### API Integration

- Axios with request/response interceptors
- Automatic JWT token injection
- Error handling with auto-logout on 401
- Centralized API endpoints

### Routing

- React Router v6 with nested routes
- Protected routes implementation
- Clean URL structure
- Navigation state management

### UI/UX

- Modern, clean design
- Responsive layout with sidebar navigation
- Status badges and priority indicators
- Loading states and error handling
- Form validation and user feedback

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Backend API Integration

The application is designed to work with a REST API. Expected endpoints:

- `POST /api/auth/login` - User authentication
- `GET /api/projects` - Fetch projects
- `POST /api/projects` - Create project
- `GET /api/tasks` - Fetch tasks
- `POST /api/tasks` - Create task

## Production Deployment

The application is optimized for production:

- Code splitting and lazy loading
- Asset optimization
- Environment variable configuration
- Build-time optimizations

## Development

### Adding New Features

1. Create slice in `features/` directory
2. Add API calls in corresponding `*Api.js` file
3. Create components in `components/` or `pages/`
4. Add routes in `AppRoutes.jsx`
5. Update Redux store if needed

### Styling Guidelines

- Use CSS classes defined in `index.css`
- Follow BEM-like naming convention
- Maintain responsive design principles
- Use semantic HTML elements

## Contributing

1. Follow the existing code structure
2. Use functional components with hooks
3. Maintain clean architecture principles
4. Add proper error handling
5. Write meaningful commit messages

## License

This project is licensed under the MIT License.
