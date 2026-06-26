import React, { useEffect } from 'react'
import { useFetch } from '../../admin/hooks/useFetch'
import { PublicCardCar } from './PublicCardCar'

export const PublicCarContainer = () => {
  const { getData, data, isLoading, error } = useFetch()

  const llamadaApi = async () => {
    const url = import.meta.env.VITE_API_URLBASE
    await getData(`${url}/cars`)
  }

  useEffect(() => {
    llamadaApi()
  }, [])

  return (
    <>
      {isLoading ? (
        <p>Cargando coches...</p>
      ) : (
        data?.data?.map((car) => (
          <div key={car._id}>
            <PublicCardCar car={car} />
          </div>
        ))
      )}
    </>
  )
}