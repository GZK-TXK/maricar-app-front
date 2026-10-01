import { Link } from 'react-router'
import { PublicCarContainer } from '../components/PublicCarContainer'

export const HomePage = () => {
  return (
    <main className="main-content">
      <section className="hero">
        <div className="hero__content">
          <span className="hero__eyebrow">Alquiler de vehículos</span>
          <h1>Encuentra el coche perfecto para tu próxima aventura</h1>
          <p>Explora nuestra flota, consulta la disponibilidad en tiempo real y reserva online en minutos.</p>
          <Link to="/cars" className="btn-primary">Ver catálogo</Link>
        </div>
        <img src="/welcome.png" alt="Bienvenido a MariCar" className="hero__image" />
      </section>

      <section>
        <h2 className="section-title">Vehículos destacados</h2>
        <PublicCarContainer page={1} limit={6} />
      </section>
    </main>
  )
}