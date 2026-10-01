import { useState, useEffect } from 'react'
import { CardReservation } from '../../components/reservation/CardReservation'
import { Pagination } from '../../components/Pagination'
import { reservationsApi } from '../../../../api/reservations.js'
import Swal from 'sweetalert2'

const PAGE_SIZE = 10

export const AdminReservation = () => {
    const [reservations, setReservations] = useState([])
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState(null)

    const fetchReservations = async () => {
        try {
            const data = await reservationsApi.list({ page, limit: PAGE_SIZE })
            setReservations(data.data)
            setPagination(data.pagination)
        } catch (err) {
            Swal.fire("Error", err.message, "error")
        }
    }

    useEffect(() => { fetchReservations() }, [page])

    const handleCancel = async (id) => {
        try {
            await reservationsApi.cancel(id)
            Swal.fire("Cancelada", "Reserva cancelada", "success")
            fetchReservations()
        } catch (err) {
            Swal.fire("Error", err.message || "No se pudo cancelar", "error")
        }
    }

    return (
        <main className="main-content">
            <header className="page-head">
                <h1>Reservas</h1>
                <p>Revisa y cancela reservas</p>
            </header>

            {reservations.length === 0 ? (
                <div className="card"><p>No hay reservas todavía.</p></div>
            ) : (
                reservations.map(r => (
                    <CardReservation key={r._id} reservation={r} onCancel={handleCancel} />
                ))
            )}

            <Pagination pagination={pagination} onPageChange={setPage} />
        </main>
    )
}