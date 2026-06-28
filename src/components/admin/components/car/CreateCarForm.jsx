import { useEffect, useRef } from 'react'
import { useForm } from '../../hooks/useForm'
import { useFetch } from '../../hooks/useFetch'
import { useNavigate } from 'react-router'

export const CreateCarForm = () => {
    const navigate = useNavigate()
    const { formulario, handleSubmit, setFormulario } = useForm()
    const { getData, data, isLoading } = useFetch(formulario)
    const formRef = useRef(null)

    const llamadaApi = async () => {
        const apiUrlBase = import.meta.env.VITE_API_URLBASE;
        const formData = new FormData(formRef.current);
        const token = localStorage.getItem("token");
        const options = {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        await getData(`${apiUrlBase}/cars`, options)
    }

    useEffect(() => {
        if (formulario) {
            llamadaApi()
        }
    }, [formulario])

    useEffect(() => {
        if (data?.ok) {
            setFormulario(null)
            navigate('/admin/cars')
        }
    }, [data])

    return (
        <>
            {isLoading && <p>Cargando</p>}
            <div>
                <form
                    ref={formRef}
                    action=""
                    method="POST"
                    target="_self"
                    autoComplete="off"
                    noValidate
                    id="createCarForm"
                    name="createCarForm"
                    acceptCharset="UTF-8"
                    onSubmit={handleSubmit}
                    rel="noopener noreferrer">
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
                        <label htmlFor="image">Imagen:</label>
                        <input type="file" id="image" name="image" accept="image/*" />
                    </div>
                    <div>
                        <p>¿Esta disponible el coche?</p>
                        <label htmlFor="available">Si</label>
                        <input type="checkbox" id="available" name="available" value="true" />
                    </div>
                    <input type="submit" value="Guardar" />
                </form>
            </div>
        </>
    )
}
