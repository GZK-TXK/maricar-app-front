import React from 'react'
import { PublicCarContainer } from '../components/PublicCarContainer'

export const HomePage = () => {
  return (
    <main className="main-content">
      <h1>Bienvenido a MariCar</h1>
      <p>
        Encuentra el coche perfecto para tu próxima aventura. 
        Explora nuestra flota de vehículos, consulta disponibilidad y reserva 
        online de forma rápida y sencilla.
      </p>
      <PublicCarContainer />
    </main>
  )
}