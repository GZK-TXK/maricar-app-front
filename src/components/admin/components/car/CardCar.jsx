import { useNavigate } from 'react-router'
import { useFetch } from '../../hooks/useFetch'
import Swal from 'sweetalert2'

export const CardCar = ({ car, onDelete }) => {
    const navigate = useNavigate()
    const { getData } = useFetch()
    const API_BASE = import.meta.env.VITE_API_URLBASE.replace("/api/v1", "")
    const imgUrl = car.imageUrl
        ? `${API_BASE}${car.imageUrl}`
        : "https://placehold.co/300x200?text=Sin+imagen"

    const llamadaApi = async () => {
        const apiUrlBase = import.meta.env.VITE_API_URLBASE
        const token = localStorage.getItem("token")
        const options = {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        }
        await getData(`${apiUrlBase}/cars/${car._id}`, options)
    }
    const handleDeleteCar = async (ev) => {
        const result = await Swal.fire({
            title: 'Mari, que te cargas el coche',
            text: 'El coche se eliminará permanentemente',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Mejor no.'
        })

        if (result.isConfirmed) {
            await llamadaApi()
            onDelete()
            Swal.fire('Eliminado', 'Hasta luego Maricoche', 'success')
        }
    }
    return (
        <div className="card-horizontal">
            <img src={imgUrl} alt={car.brand} className="card-image" />
            <div className="card-content">
                <h3>{car.brand} {car.model}</h3>
                <p>Mari-Matrícula: {car.plate}</p>
                <p>Mari-Categoría: {car.category}</p>
                <p>Mari-Precio: {car.pricePerDay}€ / día</p>
                <p>¿Esta Disponible? {car.available ? "Sí" : "No"}</p>
                <div className="card-actions">
                    <button className="btn-accent" onClick={() => navigate(`/admin/cars/${car._id}`)}>Editar</button>
                    <button title="Eliminar" className="btn-danger" onClick={handleDeleteCar}>Eliminar</button>
                </div>
            </div>
        </div>
    )
}