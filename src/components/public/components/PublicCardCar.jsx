import React from 'react'
import { useNavigate } from 'react-router'

export const PublicCardCar = ({ car }) => {
    const navigate = useNavigate()
    const API_BASE = import.meta.env.VITE_API_URLBASE.replace("/api/v1", "")
    const imgUrl = car.imageUrl ? `${API_BASE}${car.imageUrl}`: "https://placehold.co/300x200?text=Sin+imagen"
    return (
        <>
            <img src={imgUrl} alt={car.brand} style={{ width: "100%", maxHeight: 200, objectFit: "cover" }} />
            <h3>{car.brand} {car.model}</h3>
            <p>Matrícula: {car.plate}</p>
            <p>Categoría: {car.category}</p>
            <p>Precio: {car.pricePerDay}€ / día</p>
            <p>Disponible: {car.available ? "Sí" : "No"}</p>
            <button onClick={() => navigate(`/car/${car._id}`)}>Reservar</button>
        </>
    )
}