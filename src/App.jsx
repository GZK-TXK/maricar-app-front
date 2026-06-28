import './App.scss'
import { AppRoutes } from './routes/AppRoutes.jsx'
import { NavBarPublic } from './components/public/components/NavBarPublic.jsx'
import { AuthProvider } from './AuthContext'

export const App = () => {
  return (
    <AuthProvider>
      <header>
        <img src="/logo.png" alt="MariCar App" className="logo" />
        <NavBarPublic />
      </header>
      <AppRoutes />
    </AuthProvider>
  )
}

