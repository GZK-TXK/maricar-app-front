import { useState } from 'react'
import './App.css'
import { AppRoutes } from './routes/AppRoutes.jsx'
import { NavBarAdmin } from './components/admin/components/car/NavBarAdmin.jsx'
import { useLocation } from 'react-router'

export const App = () => {
  const [count, setCount] = useState(0)
  const location= useLocation()
  //const adminRoute= location.pathname.startsWith('/admin')
  return (
        <>
      <h2>MariCar App</h2>
      <NavBarAdmin/>
      <AppRoutes />
    </>
  )
}

