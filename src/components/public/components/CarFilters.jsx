import { useRef } from 'react'
import { useFlatpickr } from '../hooks/useFlatpickr'

const EMPTY = { category: '', minPrice: '', maxPrice: '', search: '', startDate: '', endDate: '' }

export const CarFilters = ({ filters, onChange }) => {
    const dateRef = useRef(null)

    const fpInstance = useFlatpickr(dateRef, {
        mode: 'range',
        minDate: 'today',
        dateFormat: 'Y-m-d',
        onChange: (dates) => {
            const startDate = dates[0] ? dates[0].toISOString().split('T')[0] : ''
            const endDate = dates[1] ? dates[1].toISOString().split('T')[0] : ''
            onChange({ ...filters, startDate, endDate })
        },
    }, [])

    const handleChange = (e) => {
        onChange({ ...filters, [e.target.name]: e.target.value })
    }

    const clear = () => {
        onChange({ ...EMPTY })
        if (fpInstance.current) fpInstance.current.clear()
    }

    return (
        <div className="filters">
            <input
                name="search"
                placeholder="Buscar marca o modelo"
                value={filters.search}
                onChange={handleChange}
            />
            <select name="category" value={filters.category} onChange={handleChange}>
                <option value="">Todas las categorías</option>
                <option value="turism">Turismo</option>
                <option value="van">Furgoneta</option>
                <option value="special">Especial</option>
            </select>
            <input
                name="minPrice"
                type="number"
                min="0"
                placeholder="Precio mín."
                value={filters.minPrice}
                onChange={handleChange}
            />
            <input
                name="maxPrice"
                type="number"
                min="0"
                placeholder="Precio máx."
                value={filters.maxPrice}
                onChange={handleChange}
            />
            <input ref={dateRef} placeholder="Disponible entre fechas" readOnly />
            <button type="button" className="btn-secondary btn-sm" onClick={clear}>Limpiar</button>
        </div>
    )
}