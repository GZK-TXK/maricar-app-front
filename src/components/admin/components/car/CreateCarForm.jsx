import react, { useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { useFetch } from '../../hooks/useFetch'
import { useNavigate } from 'react-router'

export const CreateCarForm = () => {
    const navigate= useNavigate()
    const { formulario, handleSubmit, handleChange, enviado, setFormulario } = useForm() //valores iniciales del formulario
    const {
        getData,
        data,
        isLoading,
        error
    } = useFetch(formulario)


    const llamadaApi = async () => {
        //TODO: llamar a la api pasandole los datos del formulario
        const apiUrlBase = import.meta.env.VITE_API_URLBASE;
        const options = {
            method: "POST",
            body: JSON.stringify(formulario),
            headers: {
                "Content-Type": "application/json",
            }
        }
        await getData(`${apiUrlBase}/cars`, options)
    }

    useEffect(() => {
        if (formulario) {
            llamadaApi()
        }
        
    }, [formulario])
    useEffect(()=>{
        if(data?.ok){
        setFormulario(null)
        navigate('/admin/cars')
    }
},[data])

    return (
        <>
            {<pre>FORMULARIO: {JSON.stringify(formulario)}</pre>}

            {
                isLoading && <p>Cargando</p>
            }

            {<pre>DATA: {JSON.stringify(data)}</pre>}

            <div>
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
                    <div>
                        <label htmlFor="brand">Marca:</label>
                        <input type="text" id="brand" name="brand" placeholder="Introducir la marca." ></input>
                    </div>
                    <div>
                        <label htmlFor="model">Model</label>
                        <input type="text" id="model" name="model" placeholder="Introducir el modelo."></input>
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
                        <input type="text" id="plate" name="plate" placeholder="Introducir la matricula."></input>

                    </div>
                    <div>
                        <label htmlFor="pricePerDay">Precio por dia:</label>
                        <input type="number" id="pricePerDay" name="pricePerDay" placeholder="Introducir precio por dia."></input>

                    </div>
                    <div>
                        <p>¿Esta disponible el coche?</p>
                        <label htmlFor="available">Si</label>
                        <input type="checkbox" id="available" name="available" placeholder="Disponible" value="true"></input>
                    </div>
                    <input type="submit" value="Guardar"></input>
                </form>
            </div>
        </>
    )
}


