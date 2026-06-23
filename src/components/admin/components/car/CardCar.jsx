import React from 'react'
import { Link } from 'react-router'
import { useFetch } from '../../hooks/useFetch'

export const CardCar = ({car}) => {
    const {getData}= useFetch()
    const llamadaApi = async ()=>{
        const apiUrlBase = import.meta.env.VITE_API_URLBASE
        const options = {
            method: "DELETE",
            body: JSON.stringify(car),
            headers: {"Content-Type": "application/json"}
        }
        await getData(`${apiUrlBase}/cars/${car._id}`, options)
    }
    const handleDeleteCar= (ev)=>{
        llamadaApi()
    }
    return (
        <>
            <h3>{car.brand} {car.model}</h3>
            <p>Mari-Matrícula: {car.plate}</p>
            <p>Mari-Categoría: {car.category}</p>
            <p>Mari-Precio: {car.pricePerDay}€ / día</p>
            <p>Mari, esta Disponible? {car.available === true ? "Sí" : "No"}</p>
            <Link to={`/admin/cars/${car._id}/edit`}>Editar</Link>
            <button title= "Eliminar" onClick={handleDeleteCar} >Eliminar</button>
        </>
    )
}
