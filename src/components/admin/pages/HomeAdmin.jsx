import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { adminApi } from '../../../api/admin.js'

export const HomeAdmin = () => {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await adminApi.stats()
        setStats(data.data)
      } catch (err) {
        setError(err.message)
      }
    }
    load()
  }, [])

  return (
    <main className="main-content">
      <header className="page-head">
        <h1>Panel de administración</h1>
        <p>Resumen general de MariCar</p>
      </header>

      {error && <p className="error-text">{error}</p>}
      {!stats && !error && <p>Cargando estadísticas...</p>}

      {stats && (
        <div className="stats-grid">
          <div className="stat-card"><span className="stat-value">{stats.reservations.total}</span><span className="stat-label">Reservas</span></div>
          <div className="stat-card"><span className="stat-value">{stats.reservations.paid}</span><span className="stat-label">Pagadas</span></div>
          <div className="stat-card"><span className="stat-value">{stats.reservations.pending}</span><span className="stat-label">Pendientes</span></div>
          <div className="stat-card"><span className="stat-value">{stats.reservations.upcoming}</span><span className="stat-label">Próximas</span></div>
          <div className="stat-card"><span className="stat-value">{stats.revenue.toFixed(2)}€</span><span className="stat-label">Ingresos</span></div>
          <div className="stat-card"><span className="stat-value">{stats.cars.available}/{stats.cars.total}</span><span className="stat-label">Disponibles</span></div>
          <div className="stat-card"><span className="stat-value">{stats.users.total}</span><span className="stat-label">Usuarios</span></div>
          <div className="stat-card"><span className="stat-value">{stats.reservations.cancelled}</span><span className="stat-label">Canceladas</span></div>
        </div>
      )}

      <div className="admin-actions">
        <Link to="/admin/cars" className="admin-tile">
          <span className="admin-tile__title">Coches</span>
          <span className="admin-tile__desc">Gestiona la flota</span>
        </Link>
        <Link to="/admin/users" className="admin-tile">
          <span className="admin-tile__title">Usuarios</span>
          <span className="admin-tile__desc">Administra clientes</span>
        </Link>
        <Link to="/admin/reservations" className="admin-tile">
          <span className="admin-tile__title">Reservas</span>
          <span className="admin-tile__desc">Revisa y cancela</span>
        </Link>
      </div>
    </main>
  )
}