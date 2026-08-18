import { useNavigate } from 'react-router'

export const BookingCancel = () => {
    const navigate = useNavigate()
    return (
        <>
            <h1>Reserva cancelada</h1>
            <p>No se ha realizado ningún cobro. Si lo deseas, puedes volver a intentarlo.</p>
            <button className="btn-primary" onClick={() => navigate("/cars")}>Ver coches</button>
        </>
    )
}