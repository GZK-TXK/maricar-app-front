import { useNavigate } from 'react-router'
import { CarContainer } from '../../components/car/CarContainer'

export const AdminCars = () => {
  const navigate = useNavigate()
  return (
    <main className="main-content">
      <header className="page-head">
        <h1>Coches</h1>
        <p>Gestiona la flota de MariCar</p>
      </header>
      <div className="page-actions">
        <button className="btn-primary" onClick={() => navigate('/admin/cars/create')}>Añadir coche</button>
      </div>
      <CarContainer />
    </main>
  )
}