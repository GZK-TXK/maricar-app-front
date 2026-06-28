import React from 'react'
import { PublicCarContainer } from '../components/PublicCarContainer'

export const HomePage = () => {
  return (
    <main className="main-content">
      <img src="/welcome.png" alt="Bienvenido a MariCar" className="welcome-image" />
      <p>
        Encuentra el coche perfecto para tu próxima aventura. 
        Explora nuestra flota de vehículos, consulta disponibilidad y reserva 
        online de forma rápida y sencilla.
      </p>
      <PublicCarContainer />
    </main>
  )
}