import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useFlatpickr } from '../hooks/useFlatpickr'
import Swal from 'sweetalert2'

export const CarDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const calendarRef = useRef(null)
    const [car, setCar] = useState(null)
    const [selectedRange, setSelectedRange] = useState({ start: null, end: null })

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URLBASE}/cars/${id}`)
            .then(r => r.json())
            .then(d => setCar(d.data))
    }, [id])

    const disabled = (car?.unavailableDates || []).flatMap(r => {
        const dates = [];
        let d = new Date(r.start)
        while (d <= new Date(r.end)) {
            dates.push(new Date(d))
            d.setDate(d.getDate() + 1)
        }
        return dates
    })

    const toDateString = (date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")
        return `${year}-${month}-${day}`
    }

    useFlatpickr(calendarRef, {
        mode: "range",
        minDate: "today",
        dateFormat: "Y-m-d",
        disable: car ? disabled.map(d => d.toISOString().split("T")[0]) : [],
        onChange: (selectedDates) => {
            if (selectedDates.length === 2) {
                setSelectedRange({
                    start: toDateString(selectedDates[0]),
                    end: toDateString(selectedDates[1]),
                })
            }
        },
    }, [car])

    if (!car) return <p>Cargando...</p>

    const imgUrl = car.imageUrl || "https://placehold.co/300x200?text=Sin+imagen"

    const days = selectedRange.start && selectedRange.end
        ? Math.round((new Date(selectedRange.end) - new Date(selectedRange.start)) / (1000 * 60 * 60 * 24)) + 1
        : 0
    const totalPrice = days * car.pricePerDay

    const goToReserve = () => {
        if (!selectedRange.start || !selectedRange.end) {
            Swal.fire("Selecciona las fechas", "Elige el rango en el calendario antes de reservar", "warning")
            return
        }
        navigate(`/reservar/${car._id}?start=${selectedRange.start}&end=${selectedRange.end}`)
    }

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
                {days > 0 && (
                    <p>{days} días x {car.pricePerDay}€ = <strong>{totalPrice}€</strong></p>
                )}
                <button className="btn-primary" onClick={goToReserve}>Reservar</button>
            </div>
        </>
    )
}