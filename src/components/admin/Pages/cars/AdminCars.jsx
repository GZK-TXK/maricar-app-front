import React from 'react'
import { Link } from 'react-router'
import { CarContainer } from '../../components/car/CarContainer'

export const AdminCars = () => {
  return (
    <main className="main-content">
      <h1> Administrador de coches</h1>
      <Link to='/admin/cars/create'>añadir maricoche</Link>
      <CarContainer/>
    </main>
  )
}
