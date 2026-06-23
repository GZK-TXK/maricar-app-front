import React from 'react'
import { Link } from 'react-router'
import { CarContainer } from '../../components/car/CarContainer'

export const AdminCars = () => {
  return (
    <>
      <Link to='/admin/cars/create'>añadir maricoche</Link>
      <CarContainer/>
    </>
  )
}
