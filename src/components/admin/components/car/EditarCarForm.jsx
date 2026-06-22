import React from 'react'
import useForm from '../../hooks/useForm'

export const editCarForm = () => {
    const {formulario, handleSubmit, handleChange, enviado} = useForm({})
    const getCar = {};
        
    // Traer los datos de la bbdd del coche con ese id
    
    //devolverá el obj coche

        // recoger los datos del forulario

        //llamar a al endpoint a traves de fetch

        //gestionar la respuesta la API

 

    return (
        <>
            <div>
                <form
                    action=""
                    method="POST"
                    target="_self"
                    autocomplete="off"
                    novalidate
                    id="editCarForm"
                    name="editarCarForm"
                    accept-charset="UTF-8"
                    onsubmit={handleSubmit}
                    rel="noopener noreferrer">
                    <label for="brand">Marca:</label>
                    <input type="text" id="brand" name="brand" placeholder="Introducir la marca." value={}></input>
                    <label for="model">Model</label>

                    <label for="category">Categoria:</label>
                    <select id="category" name="category">
                        <option value="turism">Turismo</option>
                        <option value="van">Furgoneta</option>
                        <option value="special">Especial</option>
                    </select>
                    <input type="text" id="model" name="model" placeholder="Introducir el modelo." ></input>
                    <label for="plate">Matricula:</label>
                    <input type="text" id="plate" name="plate" placeholder="Introducir la matricula."></input>
                    <label for="pricePerDay">Precio por dia:</label>
                    <input type="number" id="pricePerDay" name="pricePerDay" placeholder="Introducir precio por dia."></input>
                    <label for="avaiable">Disponibilidad:</label>
                    <input type="checkbox" id="avaiable" name="avaiable" placeholder="Si" value="yes"></input>
                    <input type="checkbox" id="avaiable" name="avaiable" placeholder="No" value="no"></input>
                    <input type="submit" value="Guardar"></input>
                </form>
            </div>
        </>
    )
}

