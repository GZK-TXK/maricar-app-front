import React, { useEffect } from 'react'
import { Link } from 'react-router'
import { useFetch } from '../../hooks/useFetch'
import { CardCar } from './CardCar'

export const CarContainer = () => {
  const { getData, data, isLoading, error } = useFetch()
  const llamadaApi = async () => {
    const url = import.meta.env.VITE_API_URLBASE
    await getData(`${url}/cars`)
  }
  useEffect(() => {
    llamadaApi()
  }, [data])

  return (
    <>
    {isLoading ? (
      <p>Cargando Mari-coches</p>
    ) : (
      data.data.map((car) => (
        <div key={car._id}>
         <CardCar car={car} />
        </div>
      ))
    )}
    </>
    //<p>{JSON.stringify(data)}</p>
  )
}
