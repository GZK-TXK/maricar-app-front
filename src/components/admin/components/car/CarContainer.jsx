import React, { useEffect } from 'react'
import { Link } from 'react-router'
import { useFetch } from '../../hooks/useFetch'

export const CarContainer = () => {
  const { getData, data, isLoading, error } = useFetch()
  const llamadaApi = async () => {
    const url = import.meta.env.VITE_API_URLBASE
    await getData(`${url}/cars`)
  }
  useEffect(() => {
    llamadaApi()
  }, [])

  return (
    <>{isLoading ? (
      <p>Cargando coches...</p>
    ) : (
      data?.data?.map((car) => (
        <div key={car._id}>
          <h3>{car.brand} {car.model}</h3>
          <p>Matrícula: {car.plate}</p>
          <p>Categoría: {car.category}</p>
          <p>Precio: {car.pricePerDay}€ / día</p>
          <p>Disponible: {car.available === true ? "Sí" : "No"}</p>
          <Link to={`/editcar/${car._id}`}>Editar</Link>
        </div>
      ))
    )}

    </>
    //<p>{JSON.stringify(data)}</p>
  )
}
