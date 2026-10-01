import { useState, useEffect } from 'react'
import { useAuth } from '../../../AuthContext'
import { useNavigate, Link } from 'react-router'
import { reservationsApi } from '../../../api/reservations.js'
import Swal from 'sweetalert2'

const FILTERS = [
    { key: 'all', label: 'Todas' },
    { key: 'pending', label: 'Pendientes' },
    { key: 'paid', label: 'Pagadas' },
    { key: 'cancelled', label: 'Canceladas' },
]

export const Dashboard = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [reservations, setReservations] = useState([])
    const [filter, setFilter] = useState('all')

    const fetchReservations = async () => {
        try {
            const data = await reservationsApi.my()
            setReservations(data.data)
        } catch {
            setReservations([])
        }
    }

    useEffect(() => {
        fetchReservations()
    }, [])

    const handleCancel = async (id) => {
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
            fetchReservations()
        } catch (err) {
            Swal.fire('Error', err.message, 'error')
        }
    }

    const handleLogout = async () => {
        await logout()
        navigate('/')
    }

    const avatarUrl = user?.name
        ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=16a34a&color=fff&size=128`
        : ""

    const statusInfo = {
        pending: { label: 'Pendiente', cls: 'is-pending' },
        paid: { label: 'Pagada', cls: 'is-paid' },
        cancelled: { label: 'Cancelada', cls: 'is-cancelled' },
    }

    const filtered = filter === 'all'
        ? reservations
        : reservations.filter(r => r.status === filter)

    if (!user) return null

    return (
        <main className="main-content">
            <section className="profile-card">
                <img src={avatarUrl} alt={user.name} className="avatar" />
                <div className="profile-card__info">
                    <h1>{user.name} {user.surname || ''}</h1>
                    <p className="hint">{user.email} · {user.role}</p>
                </div>
                <button className="btn-secondary btn-sm" onClick={handleLogout}>Cerrar sesión</button>
            </section>

            <h2 className="section-title">Tus reservas</h2>

            <div className="filters">
                {FILTERS.map(f => (
                    <button
                        key={f.key}
                        className={filter === f.key ? 'btn-primary btn-sm' : 'btn-secondary btn-sm'}
                        onClick={() => setFilter(f.key)}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="card"><p>No hay reservas que mostrar.</p></div>
            ) : (
                filtered.map(r => (
                    <article className="card reservation-item" key={r._id}>
                        <div className="reservation-item__head">
                            <h3>{r.car?.brand} {r.car?.model}</h3>
                            <span className={`badge ${statusInfo[r.status]?.cls || ''}`}>
                                {statusInfo[r.status]?.label || r.status}
                            </span>
                        </div>
                        <p className="hint">
                            Del {new Date(r.startDate).toLocaleDateString()} al {new Date(r.endDate).toLocaleDateString()} · {r.days} días
                        </p>
                        <p className="reservation-item__price">{r.totalPrice}€</p>
                        <div className="card-actions">
                            <Link to={`/reservations/${r._id}`} className="btn-secondary btn-sm">Ver detalle</Link>
                            {r.status === 'paid' && (
                                <button className="btn-danger btn-sm" onClick={() => handleCancel(r._id)}>Cancelar</button>
                            )}
                        </div>
                    </article>
                ))
            )}
        </main>
    )
}