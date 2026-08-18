import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router'
import Swal from 'sweetalert2'

export const ReservationForm = () => {
    const { carId } = useParams()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(false)

    const start = searchParams.get("start")
    const end = searchParams.get("end")

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URLBASE}/cars/${carId}`)
            .then(r => r.json())
            .then(d => setCar(d.data))
    }, [carId])

    if (!start || !end) {
        return (
            <>
                <h1>Selecciona unas fechas</h1>
                <p>Debes elegir el rango de fechas en el calendario del coche antes de reservar.</p>
                <button className="btn-primary" onClick={() => navigate(`/car/${carId}`)}>Volver al coche</button>
            </>
        )
    }

    if (!car) return <p>Cargando...</p>

    const days = Math.round((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)) + 1
    const totalPrice = days * car.pricePerDay
    const imgUrl = car.imageUrl || "https://placehold.co/300x200?text=Sin+imagen"

    const handlePay = async () => {
        const token = localStorage.getItem("token")
        setLoading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URLBASE}/reservations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ carId, startDate: start, endDate: end }),
            })
            const data = await res.json()
            if (!data.ok) throw new Error(data.msg)
            window.location.href = data.data.checkoutUrl
        } catch (err) {
            Swal.fire("Error", err.message, "error")
            setLoading(false)
        }
    }

    return (
        <>
            <h1>Reservar {car.brand} {car.model}</h1>
            <div className="card-horizontal">
                <img src={imgUrl} alt={car.brand} className="card-image" />
                <div className="card-content">
                    <h3>{car.brand} {car.model}</h3>
                    <p>Precio: {car.pricePerDay}€/día</p>
                    <p>Matrícula: {car.plate}</p>
                </div>
            </div>

            <div className="card">
                <h3>Resumen de tu reserva</h3>
                <p>Fecha de inicio: {start}</p>
                <p>Fecha de fin: {end}</p>
                <p>Días: {days}</p>
                <p>Total: {totalPrice}€</p>
                <button className="btn-primary" onClick={handlePay} disabled={loading}>
                    {loading ? "Creando reserva..." : "Pagar con Stripe"}
                </button>
            </div>
        </>
    )
}