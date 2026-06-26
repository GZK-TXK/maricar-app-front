import React from 'react'
import { useAuth } from '../../../AuthContext'
import { useNavigate } from 'react-router'

export const Dashboard = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <main className="main-content">
      <h1>Panel de Usuario</h1>
      <p>Bienvenido</p>
      <button onClick={handleLogout}>Logout</button>
    </main>
  )
}