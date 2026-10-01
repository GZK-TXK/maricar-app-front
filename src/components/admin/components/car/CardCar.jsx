import { useNavigate } from 'react-router'
import { carsApi } from '../../../../api/cars.js'
import Swal from 'sweetalert2'

export const CardCar = ({ car, onDelete }) => {
    const navigate = useNavigate()
    const imgUrl = car.imageUrl || "https://placehold.co/300x200?text=Sin+imagen"

    const handleDeleteCar = async () => {
        const result = await Swal.fire({
            title: '¿Eliminar coche?',
            text: 'El coche se eliminará permanentemente',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        })
        if (!result.isConfirmed) return
        try {
            await carsApi.remove(car._id)
            onDelete()
            Swal.fire('Eliminado', 'Coche eliminado', 'success')
        } catch (err) {
            Swal.fire('Error', err.message, 'error')
        }
    }

    return (
        <article className="card-horizontal">
            <img src={imgUrl} alt={car.brand} className="card-image" />
            <div className="card-content">
                <h3>{car.brand} {car.model}</h3>
                <p className="hint">{car.category} · {car.plate}</p>
                <p className="card-price">{car.pricePerDay}€ / día</p>
                <span className={`badge ${car.available ? 'is-available' : 'is-unavailable'}`}>
                    {car.available ? 'Disponible' : 'No disponible'}
                </span>
                <div className="card-actions">
                    <button className="btn-secondary btn-sm" onClick={() => navigate(`/admin/cars/${car._id}`)}>Editar</button>
                    <button className="btn-danger btn-sm" onClick={handleDeleteCar}>Eliminar</button>
                </div>
            </div>
        </article>
    )
}