import { useState } from 'react'
import './App.css'
import { AppRoutes } from './routes/AppRoutes.jsx'
import { NavBarAdmin } from './components/admin/components/car/NavBarAdmin.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2>MariCar App</h2>
      <NavBarAdmin/>      
      <AppRoutes />
    </>
  )
}

export default App
