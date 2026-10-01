import { useEffect, useState } from 'react'
import { carsApi } from '../../../../api/cars.js'
import { CardCar } from './CardCar'

export const CarContainer = () => {
  const [cars, setCars] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const llamadaApi = async () => {
    setIsLoading(true)
    try {
      const data = await carsApi.list()
      setCars(data.data || [])
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    llamadaApi()
  }, [])

  if (isLoading) return <p>Cargando Mari-coches</p>
  if (error) return <p className="error-text">{error}</p>

  return (
    <>
      {cars.map((car) => (
        <div key={car._id}>
          <CardCar car={car} onDelete={llamadaApi} />
        </div>
      ))}
    </>
  )
}