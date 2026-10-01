import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { useFlatpickr } from '../hooks/useFlatpickr'
import { carsApi } from '../../../api/cars.js'
import Swal from 'sweetalert2'

const PLACEHOLDER = "https://placehold.co/600x400?text=Sin+imagen"

export const CarDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const calendarRef = useRef(null)
    const [car, setCar] = useState(null)
    const [selectedRange, setSelectedRange] = useState({ start: null, end: null })
    const [activeImage, setActiveImage] = useState("")

    useEffect(() => {
        carsApi.get(id)
            .then((d) => setCar(d.data))
            .catch(() => setCar(null))
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

    if (!car) return <main className="main-content"><p>Cargando...</p></main>

    const images = car.images?.length ? car.images : (car.imageUrl ? [car.imageUrl] : [])
    const mainImage = activeImage || images[0] || PLACEHOLDER

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
        <main className="main-content">
            <p className="breadcrumb"><Link to="/cars">← Volver al catálogo</Link></p>

            <div className="car-detail">
                <div className="car-detail__gallery">
                    <img className="car-detail__main" src={mainImage} alt={`${car.brand} ${car.model}`} />
                    {images.length > 1 && (
                        <div className="car-detail__thumbs">
                            {images.map(url => (
                                <img
                                    key={url}
                                    src={url}
                                    alt="miniatura"
                                    className={url === mainImage ? "thumb active" : "thumb"}
                                    onClick={() => setActiveImage(url)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="car-detail__info">
                    <span className={`car-detail__badge ${car.available ? 'is-available' : 'is-unavailable'}`}>
                        {car.available ? 'Disponible' : 'No disponible'}
                    </span>
                    <h1>{car.brand} {car.model}</h1>
                    <p className="car-detail__category">{car.category} · {car.plate}</p>
                    <p className="car-detail__price">{car.pricePerDay}€<small>/día</small></p>

                    <div className="availability-section">
                        <h3>Selecciona tus fechas</h3>
                        <p className="hint">Las fechas en rojo están ocupadas</p>
                        <input ref={calendarRef} placeholder="Ver disponibilidad" readOnly />
                        {days > 0 && (
                            <p className="car-detail__total">{days} días × {car.pricePerDay}€ = <strong>{totalPrice}€</strong></p>
                        )}
                        <button className="btn-primary" onClick={goToReserve}>Reservar</button>
                    </div>
                </div>
            </div>
        </main>
    )
}