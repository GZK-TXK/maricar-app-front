import { Link } from 'react-router'
import { useFetch } from '../../hooks/useFetch'
import Swal from 'sweetalert2'

export const CardCar = ({ car, onDelete }) => {
    const { getData } = useFetch()
    const API_BASE = import.meta.env.VITE_API_URLBASE.replace("/api/v1", "")
    const imgUrl = car.imageUrl
        ? `${API_BASE}${car.imageUrl}`
        : "https://placehold.co/300x200?text=Sin+imagen"

    const llamadaApi = async () => {
        const apiUrlBase = import.meta.env.VITE_API_URLBASE
        const options = {
            method: "DELETE",
            body: JSON.stringify(car),
            headers: { "Content-Type": "application/json" }
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
        <>
            <img src={imgUrl} alt={car.brand} style={{ width: "100%", maxHeight: 150, objectFit: "cover" }} />
            <h3>{car.brand} {car.model}</h3>
            <p>Matrícula: {car.plate}</p>
            <p>Categoría: {car.category}</p>
            <p>Precio: {car.pricePerDay}€ / día</p>
            <p>¿Esta Disponible? {car.available ? "Sí" : "No"}</p>
            <Link to={`/admin/cars/${car._id}`}>Editar</Link>
            <button title="Eliminar" onClick={handleDeleteCar}>Eliminar</button>
        </>
    )
}