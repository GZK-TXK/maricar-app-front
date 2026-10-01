import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router'
import { reservationsApi } from '../../../api/reservations.js'

export const BookingSuccess = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [reservation, setReservation] = useState(null)
    const [error, setError] = useState(null)

    const sessionId = searchParams.get("session_id")

    useEffect(() => {
        reservationsApi.bySession(sessionId)
            .then((d) => setReservation(d.data))
            .catch((err) => setError(err.message))
    }, [sessionId])

    if (error) return <main className="main-content"><p className="error-text">Error: {error}</p></main>
    if (!reservation) return <main className="main-content"><p>Cargando...</p></main>

    const car = reservation.car

    return (
        <main className="main-content">
            <div className="result-card">
                <div className="result-card__icon is-success">✓</div>
                <h1>¡Reserva confirmada!</h1>
                <p className="hint">Hemos enviado los detalles a tu correo.</p>

                <dl className="booking__rows">
                    <div><dt>Coche</dt><dd>{car.brand} {car.model}</dd></div>
                    <div><dt>Desde</dt><dd>{new Date(reservation.startDate).toLocaleDateString()}</dd></div>
                    <div><dt>Hasta</dt><dd>{new Date(reservation.endDate).toLocaleDateString()}</dd></div>
                    <div><dt>Días</dt><dd>{reservation.days}</dd></div>
                    <div className="booking__total"><dt>Total pagado</dt><dd>{reservation.totalPrice}€</dd></div>
                </dl>

                <button className="btn-primary" onClick={() => navigate("/dashboard")}>Ir a mi panel</button>
            </div>
        </main>
    )
}