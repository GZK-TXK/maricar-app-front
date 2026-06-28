import React from 'react'
import { useNavigate } from 'react-router'
import { CarContainer } from '../../components/car/CarContainer'

export const AdminCars = () => {
  const navigate = useNavigate()
  return (
    <main className="main-content">
      <h1>Administrador de coches</h1>
      <button onClick={() => navigate('/admin/cars/create')}>Añadir Maricoche</button>
      <CarContainer/>
    </main>
  )
}
