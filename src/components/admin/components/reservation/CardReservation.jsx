import Swal from 'sweetalert2'

export const CardReservation = ({ reservation, onCancel }) => {
    const r = reservation
    const user = r.user
    const car = r.car

    const statusBadge = (status) => {
        const styles = {
            pending: { backgroundColor: "#f59e0b", color: "#fff" },
            paid: { backgroundColor: "#10b981", color: "#fff" },
            cancelled: { backgroundColor: "#ef4444", color: "#fff" },
        }
        const labels = { pending: "Pendiente", paid: "Pagada", cancelled: "Cancelada" }
        return <span style={{ ...styles[status], padding: "4px 10px", borderRadius: "12px", fontSize: "0.85rem" }}>{labels[status]}</span>
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
        <div className="card-horizontal">
            <div className="card-content">
                <h3>{car?.brand} {car?.model}</h3>
                <p>Cliente: {user?.name} {user?.surname || ""} · {user?.email}</p>
                <p>Del {new Date(r.startDate).toLocaleDateString()} al {new Date(r.endDate).toLocaleDateString()}</p>
                <p>{r.days} días · {r.totalPrice}€</p>
                {statusBadge(r.status)}
                {r.status === "paid" && (
                    <div className="card-actions">
                        <button className="btn-danger" onClick={handleCancel}>Cancelar reserva</button>
                    </div>
                )}
            </div>
        </div>
    )
}