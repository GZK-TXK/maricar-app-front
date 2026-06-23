import React from 'react'

export const PublicCardCar = ({car}) => {
    return (
        <>
            <h3>{car.brand} {car.model}</h3>
            <p>Matrícula: {car.plate}</p>
            <p>Categoría: {car.category}</p>
            <p>Precio: {car.pricePerDay}€ / día</p>
            <p>Disponible: {car.available === true ? "Sí" : "No"}</p>
        </>
    )
}