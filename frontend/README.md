# WorkFlowPro Frontend

Production-ready React frontend for WorkFlowPro multi-tenant SaaS application.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and development server
- **Redux Toolkit** - State management
- **React Query** - Server state management
- **React Router DOM** - Routing
- **Axios** - HTTP client

## Features

- 🏗️ **Modular Architecture** - Clean, scalable folder structure
- 🔐 **Multi-tenant Support** - Tenant ID header management
- 🚀 **Production Ready** - Optimized build with code splitting
- 🔄 **State Management** - Redux Toolkit with persistence
- 📡 **API Integration** - Axios with interceptors
- 🛡️ **Protected Routes** - Authentication-based routing
- 🎯 **Type Safety** - Modern JavaScript with ESLint

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8080/api
```

## Project Structure

```
src/
├── app/
│   └── store.js              # Redux store configuration
├── features/
│   └── auth/
│       └── authSlice.js      # Authentication state management
├── services/
│   ├── api.js                # Axios configuration
│   └── queryClient.js        # React Query configuration
├── pages/
│   ├── LoginPage.jsx         # Login page
│   └── DashboardPage.jsx     # Dashboard page
├── layouts/
│   ├── AuthLayout.jsx        # Authentication layout
│   └── MainLayout.jsx        # Main application layout
├── routes/
│   ├── AppRoutes.jsx         # Application routes
│   └── ProtectedRoute.jsx    # Route protection
├── components/               # Reusable components
├── hooks/                    # Custom hooks
├── utils/                    # Utility functions
├── App.jsx                   # Main App component
├── main.jsx                  # Application entry point
└── index.css                 # Global styles
```

## Key Features

### Authentication

- JWT token management
- Automatic token injection
- Tenant ID handling
- Protected routes
- Logout functionality

### API Integration

- Axios interceptors for auth headers
- Automatic tenant ID injection
- Error handling and redirects
- Request/response logging

### State Management

- Redux Toolkit for global state
- Local storage persistence
- React Query for server state
- Optimistic updates

### Development

- Hot module replacement
- ESLint configuration
- Path aliases
- Source maps
- Development tools

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Configuration

### Vite Configuration

- React plugin
- Path aliases
- Development proxy
- Build optimization
- Code splitting

### Redux Store

- Auth reducer
- DevTools integration
- Middleware configuration
- Serializable checks

### React Query

- Retry logic
- Caching strategy
- Error handling
- DevTools integration

## Production Deployment

The application is optimized for production deployment with:

- Code splitting
- Tree shaking
- Asset optimization
- Source maps
- Chunk optimization

## Contributing

1. Follow the existing code structure
2. Use functional components and hooks
3. Maintain clean architecture
4. Add proper error handling
5. Write meaningful commit messages

## License

This project is licensed under the MIT License.
