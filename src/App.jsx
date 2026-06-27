import { useState } from 'react'
import './App.scss'
import { AppRoutes } from './routes/AppRoutes.jsx'
import { useLocation } from 'react-router'
import { NavBarPublic } from './components/public/components/NavBarPublic.jsx'
import { AuthProvider } from './AuthContext'

export const App = () => {
  const [count, setCount] = useState(0)
  const location = useLocation()
  return (
    <AuthProvider>
      <h2>MariCar App</h2>
      <NavBarPublic />
      <AppRoutes />
    </AuthProvider>
  )
}

