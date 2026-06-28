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

    const API_BASE = import.meta.env.VITE_API_URLBASE.replace("/api/v1", "")

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

    const imgUrl = car.imageUrl ? `${API_BASE}${car.imageUrl}` : "https://placehold.co/300x200?text=Sin+imagen"

    return (
        <>
            <h1>Reservar {car.brand} {car.model}</h1>
            <img src={imgUrl} alt={car.brand} className="card-image-lg" />
            <p>Precio: {car.pricePerDay}€/día</p>

            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input name="phone" type="tel" placeholder="Teléfono" value={form.phone} onChange={handleChange} required />
                <textarea name="message" placeholder="Mensaje (opcional)" value={form.message} onChange={handleChange} />
                <button type="submit">Enviar solicitud</button>
            </form>
        </>
    )
}
