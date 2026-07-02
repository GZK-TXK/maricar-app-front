import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import { useAuth } from '../../../AuthContext'

export const ContactForm = () => {
    const { carId } = useParams()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: "", message: "" })

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URLBASE}/cars/${carId}`)
            .then(r => r.json())
            .then(d => setCar(d.data))
    }, [carId])

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URLBASE}/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, carInfo: `${car.brand} ${car.model}` })
            })
            const data = await res.json()
            if (!data.ok) throw new Error(data.msg)
            Swal.fire("Enviado", "Reserva enviada correctamente", "success")
            navigate("/cars")
        } catch (err) {
            Swal.fire("Error", err.message, "error")
        }
    }

    if (!car) return <p>Cargando...</p>

    const imgUrl = car.imageUrl || "https://placehold.co/300x200?text=Sin+imagen"

    return (
        <>
            <h1>Reservar {car.brand} {car.model}</h1>
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

            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input name="phone" type="tel" placeholder="Teléfono" value={form.phone} onChange={handleChange} required />
                <textarea name="message" placeholder="Indica las fechas que deseas reservar" value={form.message} onChange={handleChange} required />
                <button type="submit">Enviar solicitud</button>
            </form>
        </>
    )
}
