import React from 'react'
import { useNavigate } from 'react-router'

export const PublicCardCar = ({ car }) => {
    const navigate = useNavigate()
    const imgUrl = car.imageUrl || "https://placehold.co/300x200?text=Sin+imagen"
    return (
        <div className="card-horizontal">
            <img src={imgUrl} alt={car.brand} className="card-image" />
            <div className="card-content">
                <h3>{car.brand} {car.model}</h3>
                <p>Mari-Matrícula: {car.plate}</p>
                <p>Mari-Categoría: {car.category}</p>
                <p>Mari-Precio: {car.pricePerDay}€ / día</p>
                <p>Disponible: {car.available ? "Sí" : "No"}</p>
                <div className="card-actions">
                    <button onClick={() => navigate(`/car/${car._id}`)}>Reservar</button>
                </div>
            </div>
        </div>
    )
}