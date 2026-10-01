import { useNavigate } from 'react-router'

export const BookingCancel = () => {
    const navigate = useNavigate()
    return (
        <main className="main-content">
            <div className="result-card">
                <div className="result-card__icon is-danger">!</div>
                <h1>Reserva cancelada</h1>
                <p className="hint">No se ha realizado ningún cobro. Puedes volver a intentarlo cuando quieras.</p>
                <button className="btn-primary" onClick={() => navigate("/cars")}>Ver coches</button>
            </div>
        </main>
    )
}