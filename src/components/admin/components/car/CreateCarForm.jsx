import react from 'react'
import { useForm } from '../../hooks/useForm' //ya no sirve con useFetch
import { useFetch } from '../../hooks/useFetch'

const CreateCarForm = () => {const {formulario, handleSubmit, handleChange, enviado} = useForm({
    brand: "",
    model: "",
    plate: "",
    category: "turism",
    pricePerDay: "",
    available: true,
}) //valores iniciales del formulario
    return (
        <>
            <div>
                <pre>{JSON.stringify(formulario)}</pre>
                <form
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
                    <label htmlFor="brand">Marca:</label>
                    <input type="text" id="brand" name="brand" placeholder="Introducir la marca." onChange={handleChange}></input>
                    <label htmlFor="model">Model</label>

                    <label htmlFor="category">Categoria:</label>
                    <select id="category" name="category">
                        <option value="turism">Turismo</option>
                        <option value="van">Furgoneta</option>
                        <option value="special">Especial</option>
                    </select>
                    <input type="text" id="model" name="model" placeholder="Introducir el modelo." onChange={handleChange}></input>
                    <label htmlFor="plate">Matricula:</label>
                    <input type="text" id="plate" name="plate" placeholder="Introducir la matricula."onChange={handleChange}></input>
                    <label htmlFor="pricePerDay">Precio por dia:</label>
                    <input type="number" id="pricePerDay" name="pricePerDay" placeholder="Introducir precio por dia."onChange={handleChange}></input>
                    <label htmlFor="avaiable">Disponibilidad:</label>
                    <input type="checkbox" id="available-yes" name="available-yes" placeholder="Si" value="yes"onChange={handleChange}></input>
                    <input type="checkbox" id="available-no" name="available-no" placeholder="No" value="no"onChange={handleChange}></input>
                    <input type="submit" value="Guardar"></input>
                </form>
            </div>
        </>
    )
}

export default CreateCarForm
