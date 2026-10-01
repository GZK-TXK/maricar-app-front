import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router'
import { carsApi } from '../../../api/cars.js'
import { reservationsApi } from '../../../api/reservations.js'
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
        carsApi.get(carId)
            .then((d) => setCar(d.data))
            .catch(() => setCar(null))
    }, [carId])

    if (!start || !end) {
        return (
            <main className="main-content">
                <h1>Selecciona unas fechas</h1>
                <p>Debes elegir el rango de fechas en el calendario del coche antes de reservar.</p>
                <button className="btn-primary" onClick={() => navigate(`/car/${carId}`)}>Volver al coche</button>
            </main>
        )
    }

    if (!car) return <main className="main-content"><p>Cargando...</p></main>

    const days = Math.round((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)) + 1
    const totalPrice = days * car.pricePerDay
    const imgUrl = car.imageUrl || "https://placehold.co/300x200?text=Sin+imagen"

    const handlePay = async () => {
        setLoading(true)
        try {
            const data = await reservationsApi.create({ carId, startDate: start, endDate: end })
            window.location.href = data.data.checkoutUrl
        } catch (err) {
            Swal.fire("Error", err.message, "error")
            setLoading(false)
        }
    }

    return (
        <main className="main-content">
            <h1>Confirmar reserva</h1>

            <div className="booking">
                <div className="booking__car">
                    <img src={imgUrl} alt={`${car.brand} ${car.model}`} />
                    <div>
                        <h3>{car.brand} {car.model}</h3>
                        <p className="car-detail__category">{car.category} · {car.plate}</p>
                    </div>
                </div>

                <dl className="booking__rows">
                    <div><dt>Desde</dt><dd>{start}</dd></div>
                    <div><dt>Hasta</dt><dd>{end}</dd></div>
                    <div><dt>Días</dt><dd>{days}</dd></div>
                    <div><dt>Precio/día</dt><dd>{car.pricePerDay}€</dd></div>
                    <div className="booking__total"><dt>Total</dt><dd>{totalPrice}€</dd></div>
                </dl>

                <button className="btn-primary btn-block" onClick={handlePay} disabled={loading}>
                    {loading ? "Creando reserva..." : "Pagar con Stripe"}
                </button>
            </div>
        </main>
    )
}