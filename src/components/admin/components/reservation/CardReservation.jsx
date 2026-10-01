import Swal from 'sweetalert2'

export const CardReservation = ({ reservation, onCancel }) => {
    const r = reservation
    const user = r.user
    const car = r.car

    const statusInfo = {
        pending: { label: 'Pendiente', cls: 'is-pending' },
        paid: { label: 'Pagada', cls: 'is-paid' },
        cancelled: { label: 'Cancelada', cls: 'is-cancelled' },
    }

    const handleCancel = async () => {
        const result = await Swal.fire({
            title: "¿Cancelar reserva?",
            text: `Se cancelará la reserva de ${user?.name} ${user?.surname || ""}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Cancelar reserva",
            cancelButtonText: "Volver"
        })
        if (result.isConfirmed) onCancel(r._id)
    }

    return (
        <article className="card reservation-item">
            <div className="reservation-item__head">
                <h3>{car?.brand} {car?.model}</h3>
                <span className={`badge ${statusInfo[r.status]?.cls || ''}`}>{statusInfo[r.status]?.label || r.status}</span>
            </div>
            <p className="hint">Cliente: {user?.name} {user?.surname || ""} · {user?.email}</p>
            <p className="hint">Del {new Date(r.startDate).toLocaleDateString()} al {new Date(r.endDate).toLocaleDateString()} · {r.days} días</p>
            <p className="reservation-item__price">{r.totalPrice}€</p>
            {r.status === "paid" && (
                <div className="card-actions">
                    <button className="btn-danger btn-sm" onClick={handleCancel}>Cancelar reserva</button>
                </div>
            )}
        </article>
    )
}