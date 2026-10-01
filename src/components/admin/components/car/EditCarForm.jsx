import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useFlatpickr } from '../../../public/hooks/useFlatpickr'
import { carsApi } from '../../../../api/cars.js'
import Swal from 'sweetalert2'

export const EditCarForm = ({ id }) => {
    const navigate = useNavigate()
    const formRef = useRef(null)
    const calendarRef = useRef(null)
    const [formulario, setFormulario] = useState(null)
    const [unavailableDates, setUnavailableDates] = useState([])
    const [gallery, setGallery] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            try {
                const data = await carsApi.get(id)
                const car = data.data
                setFormulario(car)
                setUnavailableDates(car.unavailableDates || [])
                const imgs = car.images?.length
                    ? car.images
                    : (car.imageUrl ? [car.imageUrl] : [])
                setGallery(imgs)
            } catch (err) {
                Swal.fire('Error', err.message, 'error')
            } finally {
                setIsLoading(false)
            }
        }
        load()
    }, [id])

    const handleChange = (ev) => {
        const { name, value, type, checked } = ev.target
        setFormulario((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    const fpInstance = useFlatpickr(calendarRef, {
        mode: "range",
        minDate: "today",
        dateFormat: "Y-m-d"
    }, [])

    const addDateRange = () => {
        const fp = fpInstance.current
        if (!fp || fp.selectedDates.length === 0) return
        const dates = fp.selectedDates.map(d => d.toISOString().split("T")[0])
        const start = dates[0]
        const end = dates.length > 1 ? dates[dates.length - 1] : start
        setUnavailableDates(prev => [...prev, { start, end }])
        fp.clear()
    }

    const removeDateRange = (index) => {
        setUnavailableDates(prev => prev.filter((_, i) => i !== index))
    }

    const removeImage = (url) => {
        setGallery(prev => prev.filter(u => u !== url))
    }

    const handleFormSubmit = async (ev) => {
        ev.preventDefault()
        const formData = new FormData(formRef.current)
        formData.set("available", formulario?.available ? "true" : "false")
        formData.set("unavailableDates", JSON.stringify(unavailableDates))
        formData.set("keepImages", JSON.stringify(gallery))
        try {
            await carsApi.update(id, formData)
            navigate('/admin/cars')
        } catch (err) {
            Swal.fire('Error', err.message, 'error')
        }
    }

    if (isLoading) return <p>Cargando coche.</p>

    return (
        <form
            ref={formRef}
            id="editCarForm"
            name="editarCarForm"
            onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="brand">Marca:</label>
                <input type="text" id="brand" name="brand" value={formulario?.brand || ''} onChange={handleChange} placeholder="Introducir la marca." />

                <label htmlFor="model">Model</label>
                <input type="text" id="model" name="model" value={formulario?.model || ''} onChange={handleChange} placeholder="Introducir el modelo." />

                <label htmlFor="category">Categoria:</label>
                <select id="category" name="category" value={formulario?.category || ''} onChange={handleChange}>
                    <option value="turism">Turismo</option>
                    <option value="van">Furgoneta</option>
                    <option value="special">Especial</option>
                </select>

                <label htmlFor="plate">Matricula:</label>
                <input type="text" id="plate" name="plate" value={formulario?.plate || ''} onChange={handleChange} placeholder="Introducir la matricula." />

                <label htmlFor="pricePerDay">Precio por dia:</label>
                <input type="number" id="pricePerDay" name="pricePerDay" value={formulario?.pricePerDay || ''} onChange={handleChange} placeholder="Introducir precio por dia." />

                <label htmlFor="available">Disponibilidad:</label>
                <input type="checkbox" id="available" name="available" value="true" checked={formulario?.available || false} onChange={handleChange} />

                <hr />
                <h3>Imágenes actuales</h3>
                {gallery.length === 0 && <p>No hay imágenes</p>}
                <div className="image-gallery">
                    {gallery.map(url => (
                        <div key={url} className="image-thumb">
                            <img src={url} alt="coche" />
                            <button type="button" className="btn-danger btn-sm" onClick={() => removeImage(url)}>X</button>
                        </div>
                    ))}
                </div>
                <label htmlFor="images">Añadir imágenes:</label>
                <input type="file" id="images" name="images" accept="image/*" multiple />

                <hr />
                <h3>Fechas no disponibles</h3>
                {unavailableDates.length === 0 && <p>No hay fechas bloqueadas</p>}
                <ul className="date-range-list">
                    {unavailableDates.map((r, i) => (
                        <li key={i}>
                            {new Date(r.start).toLocaleDateString()} - {new Date(r.end).toLocaleDateString()}
                            <button type="button" className="btn-danger btn-sm" onClick={() => removeDateRange(i)}>X</button>
                        </li>
                    ))}
                </ul>
                <input ref={calendarRef} placeholder="Seleccionar rango de fechas" readOnly />
                <button type="button" className="btn-accent btn-sm" onClick={addDateRange}>Añadir rango</button>
                <hr />

                <input type="submit" value="Guardar" />
            </div>
        </form>
    )
}