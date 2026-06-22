import React from 'react'
import { Link } from 'react-router'
import { CarContainer } from '../../components/car/CarContainer'

export const AdminCars = () => {
  return (
    <>
      <Link to='/createcar'>añadir maricoche</Link>
      <CarContainer/>
    </>
  )
}
