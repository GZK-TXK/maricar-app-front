import { useState, useEffect } from 'react'
import { CardReservation } from '../../components/reservation/CardReservation'
import Swal from 'sweetalert2'

export const AdminReservation = () => {
    const [reservations, setReservations] = useState([])

    const API = import.meta.env.VITE_API_URLBASE

    const fetchReservations = async () => {
        const res = await fetch(`${API}/reservations`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        const data = await res.json()
        if (data.ok) setReservations(data.data)
    }

    useEffect(() => { fetchReservations() }, [])

    const handleCancel = async (id) => {
        const res = await fetch(`${API}/reservations/${id}/cancel`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        const data = await res.json()
        if (data.ok) {
            Swal.fire("Cancelada", "Reserva cancelada", "success")
            fetchReservations()
        } else {
            Swal.fire("Error", data.msg || "No se pudo cancelar", "error")
        }
    }

    return (
        <main className="main-content">
            <h1>Gestión de Reservas</h1>
            {reservations.length === 0 ? (
                <p>No hay reservas todavía.</p>
            ) : (
                reservations.map(r => (
                    <CardReservation key={r._id} reservation={r} onCancel={handleCancel} />
                ))
            )}
        </main>
    )
}