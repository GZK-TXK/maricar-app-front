import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router'

export const BookingSuccess = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [reservation, setReservation] = useState(null)
    const [error, setError] = useState(null)

    const sessionId = searchParams.get("session_id")

    useEffect(() => {
        const token = localStorage.getItem("token")
        fetch(`${import.meta.env.VITE_API_URLBASE}/reservations/session/${sessionId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(r => r.json())
            .then(d => {
                if (!d.ok) throw new Error(d.msg)
                setReservation(d.data)
            })
            .catch(err => setError(err.message))
    }, [sessionId])

    if (error) return <p>Error: {error}</p>
    if (!reservation) return <p>Cargando...</p>

    const car = reservation.car

    return (
        <>
            <h1>¡Reserva confirmada!</h1>
            <div className="card">
                <p>Coche: {car.brand} {car.model}</p>
                <p>Fecha de inicio: {new Date(reservation.startDate).toLocaleDateString()}</p>
                <p>Fecha de fin: {new Date(reservation.endDate).toLocaleDateString()}</p>
                <p>Días: {reservation.days}</p>
                <p>Total pagado: {reservation.totalPrice}€</p>
                <p>Estado: {reservation.status}</p>
                <button className="btn-primary" onClick={() => navigate("/dashboard")}>Ir a mi panel</button>
            </div>
        </>
    )
}