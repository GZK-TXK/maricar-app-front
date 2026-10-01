import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import { reservationsApi } from '../../../api/reservations.js'
import Swal from 'sweetalert2'

export const ReservationDetail = () => {
    const { id } = useParams()
    const [reservation, setReservation] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchReservation = async () => {
        setLoading(true)
        try {
            const data = await reservationsApi.get(id)
            setReservation(data.data)
            setError(null)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchReservation()
    }, [id])

    const handleCancel = async () => {
        const result = await Swal.fire({
            title: '¿Cancelar reserva?',
            text: 'La reserva se cancelará y se liberarán las fechas.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'Volver',
        })
        if (!result.isConfirmed) return
        try {
            await reservationsApi.cancel(id)
            Swal.fire('Cancelada', 'Tu reserva ha sido cancelada', 'success')
            fetchReservation()
        } catch (err) {
            Swal.fire('Error', err.message, 'error')
        }
    }

    if (loading) return <main className="main-content"><p>Cargando...</p></main>
    if (error) return <main className="main-content"><p className="error-text">Error: {error}</p></main>
    if (!reservation) return null

    const car = reservation.car
    const imgUrl = car?.imageUrl || "https://placehold.co/300x200?text=Sin+imagen"
    const statusLabels = { pending: 'Pendiente', paid: 'Pagada', cancelled: 'Cancelada' }

    return (
        <main className="main-content">
            <h1>Detalle de reserva</h1>
            <p><Link to="/dashboard">← Volver a mi panel</Link></p>

            <div className="card-horizontal">
                <img src={imgUrl} alt={car?.brand} className="card-image" />
                <div className="card-content">
                    <h3>{car?.brand} {car?.model}</h3>
                    <p>Matrícula: {car?.plate}</p>
                    <p>Categoría: {car?.category}</p>
                    <p>Precio/día: {reservation.pricePerDay}€</p>
                </div>
            </div>

            <div className="card">
                <h3>Resumen</h3>
                <p><strong>Estado:</strong> {statusLabels[reservation.status] || reservation.status}</p>
                <p><strong>Desde:</strong> {new Date(reservation.startDate).toLocaleDateString()}</p>
                <p><strong>Hasta:</strong> {new Date(reservation.endDate).toLocaleDateString()}</p>
                <p><strong>Días:</strong> {reservation.days}</p>
                <p><strong>Total:</strong> {reservation.totalPrice}€</p>
                <p><strong>Referencia:</strong> {reservation._id}</p>
                <p><strong>Creada el:</strong> {new Date(reservation.createdAt).toLocaleString()}</p>
                {reservation.status === 'paid' && (
                    <button className="btn-danger" onClick={handleCancel}>Cancelar reserva</button>
                )}
            </div>
        </main>
    )
}