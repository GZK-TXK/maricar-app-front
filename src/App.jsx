import { useState } from 'react'
import './App.css'
import AdminCars from './components/admin/Pages/AdminCars.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AdminCars />   
    </>
  )
}

export default App
