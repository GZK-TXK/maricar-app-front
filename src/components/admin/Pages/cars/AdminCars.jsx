import React from 'react'
import { Link } from 'react-router'
import { CarContainer } from '../../components/car/CarContainer'

export const AdminCars = () => {
  return (
    <main className="main-content">
      <Link to='/admin/cars/create'>añadir maricoche</Link>
      <CarContainer/>
    </main>
  )
}
