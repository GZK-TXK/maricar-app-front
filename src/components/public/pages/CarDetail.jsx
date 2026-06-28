import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'

export const CarDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const calendarRef = useRef(null)
    const [car, setCar] = useState(null)

    const API_BASE = import.meta.env.VITE_API_URLBASE.replace("/api/v1", "")

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URLBASE}/cars/${id}`)
            .then(r => r.json())
            .then(d => setCar(d.data))
    }, [id])

    useEffect(() => {
        if (!car) return
        const disabled = (car.unavailableDates || []).flatMap(r => {
            const dates = []
            let d = new Date(r.start)
            while (d <= new Date(r.end)) {
                dates.push(new Date(d))
                d.setDate(d.getDate() + 1)
            }
            return dates
        })
        flatpickr(calendarRef.current, {
            mode: "range",
            minDate: "today",
            dateFormat: "Y-m-d",
            disable: disabled.map(d => d.toISOString().split("T")[0]),
        })
    }, [car])

    if (!car) return <p>Cargando...</p>

    const imgUrl = car.imageUrl ? `${API_BASE}${car.imageUrl}` : "https://placehold.co/300x200?text=Sin+imagen"

    return (
        <>
            <h1>{car.brand} {car.model}</h1>
            <div className="card-horizontal">
                <img src={imgUrl} alt={car.brand} className="card-image" />
                <div className="card-content">
                    <h3>{car.brand} {car.model}</h3>
                    <p>Precio: {car.pricePerDay}€/día</p>
                    <p>Matrícula: {car.plate}</p>
                    <p>Categoría: {car.category}</p>
                    <p>Disponible: {car.available ? "Sí" : "No"}</p>
                </div>
            </div>

            <div className="availability-section">
                <h3>Disponibilidad</h3>
                <p>Las fechas en rojo están ocupadas</p>
                <input ref={calendarRef} placeholder="Ver disponibilidad" readOnly />
                <br /><br />
                <button className="btn-primary" onClick={() => navigate(`/reservar/${car._id}`)}>Reservar</button>
            </div>
        </>
    )
}
