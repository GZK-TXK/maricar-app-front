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
            <p>Matrícula: {car.plate}</p>
            <p>Categoría: {car.category}</p>
            <p>Precio: {car.pricePerDay}€ / día</p>
            <p>Disponible: {car.available === true ? "Sí" : "No"}</p>
            <Link to={`/editcar/${car._id}`}>Editar</Link>
            <button title= "Eliminar" onClick={handleDeleteCar} >Eliminar</button>
        </>
    )
}
