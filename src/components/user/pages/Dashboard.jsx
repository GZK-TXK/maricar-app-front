import { useState, useEffect } from 'react'
import { useAuth } from '../../../AuthContext'
import { useNavigate } from 'react-router'

export const Dashboard = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [reservations, setReservations] = useState([])

    useEffect(() => {
        const fetchReservations = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URLBASE}/reservations/my`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            const data = await res.json()
            if (data.ok) setReservations(data.data)
        }
        fetchReservations()
    }, [])

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const avatarUrl = user?.name
        ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6b7280&color=fff&size=128`
        : ""

    const statusBadge = (status) => {
        const styles = {
            pending: { backgroundColor: "#f59e0b", color: "#fff" },
            paid: { backgroundColor: "#10b981", color: "#fff" },
            cancelled: { backgroundColor: "#ef4444", color: "#fff" },
        }
        const labels = { pending: "Pendiente", paid: "Pagada", cancelled: "Cancelada" }
        return <span style={{ ...styles[status], padding: "4px 10px", borderRadius: "12px", fontSize: "0.85rem" }}>{labels[status]}</span>
    }

    return (
        <main className="main-content">
            {user && (
                <>
                    <img src={avatarUrl} alt={user.name} className="avatar" />
                    <h1>Panel de Usuario</h1>
                    <p>Bienvenido, {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Rol: {user.role}</p>

                    <hr />

                    <h2>Tus reservas</h2>
                    {reservations.length === 0 ? (
                        <div className="card">
                            <p>Aún no tienes reservas.</p>
                        </div>
                    ) : (
                        reservations.map(r => (
                            <div className="card" key={r._id}>
                                <h3>{r.car?.brand} {r.car?.model}</h3>
                                <p>Del {new Date(r.startDate).toLocaleDateString()} al {new Date(r.endDate).toLocaleDateString()}</p>
                                <p>{r.days} días · {r.totalPrice}€</p>
                                {statusBadge(r.status)}
                            </div>
                        ))
                    )}
                </>
            )}
            <button className="btn-accent" onClick={handleLogout}>Cerrar sesión</button>
        </main>
    )
}