import { useEffect, useState } from 'react'
import { carsApi } from '../../../api/cars.js'
import { PublicCardCar } from './PublicCardCar'

export const PublicCarContainer = ({ filters = {}, page, limit, onPageChange }) => {
  const [cars, setCars] = useState([])
  const [pagination, setPagination] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const filtersKey = JSON.stringify(filters)

  useEffect(() => {
    let active = true

    const timer = setTimeout(async () => {
      setIsLoading(true)
      try {
        const params = { ...filters }
        if (page !== undefined) params.page = page
        if (limit !== undefined) params.limit = limit

        const data = await carsApi.list(params)
        if (!active) return
        setCars(data.data || [])
        setPagination(data.pagination || null)
        setError(null)
      } catch (err) {
        if (!active) return
        setCars([])
        setError(err.message)
      } finally {
        if (active) setIsLoading(false)
      }
    }, 350)

    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [filtersKey, page, limit])

  if (isLoading) return <p>Cargando coches...</p>
  if (error) return <p className="error-text">{error}</p>
  if (cars.length === 0) return <p>No hay coches que coincidan con tu búsqueda.</p>

  return (
    <>
      {cars.map((car) => (
        <div key={car._id}>
          <PublicCardCar car={car} />
        </div>
      ))}

      {onPageChange && pagination && pagination.totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn-secondary btn-sm"
            disabled={pagination.page <= 1}
            onClick={() => onPageChange(pagination.page - 1)}
          >
            Anterior
          </button>
          <span>Página {pagination.page} de {pagination.totalPages}</span>
          <button
            className="btn-secondary btn-sm"
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => onPageChange(pagination.page + 1)}
          >
            Siguiente
          </button>
        </div>
      )}
    </>
  )
}