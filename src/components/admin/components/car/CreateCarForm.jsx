import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { carsApi } from '../../../../api/cars.js'
import Swal from 'sweetalert2'

export const CreateCarForm = () => {
    const navigate = useNavigate()
    const formRef = useRef(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        setLoading(true)
        const formData = new FormData(formRef.current)
        formData.set("available", formData.has("available") ? "true" : "false")
        try {
            await carsApi.create(formData)
            navigate('/admin/cars')
        } catch (err) {
            Swal.fire('Error', err.message, 'error')
            setLoading(false)
        }
    }

    return (
        <form
            ref={formRef}
            id="createCarForm"
            name="createCarForm"
            onSubmit={handleSubmit}>
            <div>
                <label htmlFor="brand">Marca:</label>
                <input type="text" id="brand" name="brand" placeholder="Introducir la marca." />
            </div>
            <div>
                <label htmlFor="model">Model</label>
                <input type="text" id="model" name="model" placeholder="Introducir el modelo." />
            </div>
            <div>
                <label htmlFor="category">Categoria:</label>
                <select id="category" name="category">
                    <option value="turism">Turismo</option>
                    <option value="van">Furgo</option>
                    <option value="special">Caravana</option>
                </select>
            </div>
            <div>
                <label htmlFor="plate">Matricula:</label>
                <input type="text" id="plate" name="plate" placeholder="Introducir la matricula." />
            </div>
            <div>
                <label htmlFor="pricePerDay">Precio por dia:</label>
                <input type="number" id="pricePerDay" name="pricePerDay" placeholder="Introducir precio por dia." />
            </div>
            <div>
                <label htmlFor="images">Imágenes (puedes subir varias):</label>
                <input type="file" id="images" name="images" accept="image/*" multiple />
            </div>
            <div>
                <p>¿Esta disponible el coche?</p>
                <label htmlFor="available">Si</label>
                <input type="checkbox" id="available" name="available" value="true" />
            </div>
            <input type="submit" value={loading ? "Guardando..." : "Guardar"} disabled={loading} />
        </form>
    )
}