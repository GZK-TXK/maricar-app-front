import React from 'react'
import { NavBarAdmin } from '../components/car/NavBarAdmin'
import { Link, Navigate, useNavigate } from 'react-router'

export const HomeAdmin = () => {

  const navigate = useNavigate()

  const handleCar = (url) => {
    navigate(`/admin/${url}`)
  }

  return (
    <main className="main-content">
      <h2>C-PANEL</h2>

      <div>

        <button
          onClick={()=> handleCar('cars')}
        >
          Cars
        </button>

        
        <button
           onClick={()=> handleCar('users')}
        >
          User
        </button>

        
        <button
          onClick={handleCar}
        >
          Cars
        </button>

      </div>
    </main>

  )
}
