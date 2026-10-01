import './App.scss'
import { AppRoutes } from './routes/AppRoutes.jsx'
import { NavBarPublic } from './components/public/components/NavBarPublic.jsx'
import { AuthProvider } from './AuthContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { NavLink } from 'react-router'

export const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <header>
          <NavLink to="/"><img src="/logo.png" alt="MariCar App" className="logo" /></NavLink>
          <NavBarPublic />
        </header>
        <AppRoutes />
      </AuthProvider>
    </ErrorBoundary>
  )
}