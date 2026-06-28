import './App.scss'
import { AppRoutes } from './routes/AppRoutes.jsx'
import { NavBarPublic } from './components/public/components/NavBarPublic.jsx'
import { AuthProvider } from './AuthContext'
import { NavLink } from 'react-router'

export const App = () => {
  return (
    <AuthProvider>
      <header>
        <NavLink to="/"><img src="/logo.png" alt="MariCar App" className="logo" /></NavLink>
        <NavBarPublic />
      </header>
      <AppRoutes />
    </AuthProvider>
  )
}

