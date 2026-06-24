import React, { useEffect, useRef } from 'react'
import { useForm } from '../../hooks/useForm';
import { useFetch } from '../../hooks/useFetch'
import { useNavigate } from 'react-router';

export const EditCarForm = ({id}) => {
const {formulario, handleSubmit, handleChange, setFormulario, enviado} = useForm({})
// Traer los datos de la bbdd del coche con ese id
const {getData, isLoading, error, data}=useFetch()
const isLoaded = useRef(false)
    const getCar = async ()=>{
        const url= import.meta.env.VITE_API_URLBASE;
        await getData(`${url}/cars/${id}`)        
    }
const navigate= useNavigate()
    //devolverá el obj coche
    useEffect(() => {
      getCar(id)    
    }, [])
    // recoger los datos del forulario
useEffect(() => {
    if (data?.data) {
        setFormulario(data.data)
    }
}, [data])
    //llamar a al endpoint a traves de fetch
    const llamadaApi = async () => {
        const apiUrlBase = import.meta.env.VITE_API_URLBASE
        const options = {
            method: "PUT",
            body: JSON.stringify(formulario),
            headers: { "Content-Type": "application/json" }
        }
        await getData(`${apiUrlBase}/cars/${id}`, options)
    }
    //gestionar la respuesta la API 
    const handleFormSubmit= (ev)=>{
        ev.preventDefault()
        llamadaApi()
        navigate('/admin/cars')
    }
        return (
        <>
        {isLoading && <p>Cargando coche.</p>}
        {<pre>FORMULARIO: {JSON.stringify(formulario)}</pre>}
        {<pre>FORMULARIO: {JSON.stringify(data)}</pre>}
            <div>
                <form
                    action=""
                    method="POST"
                    target="_self"
                    autoComplete="off"
                    noValidate
                    id="editCarForm"
                    name="editarCarForm"
                    acceptCharset="UTF-8"
                    onSubmit={handleFormSubmit}
                    rel="noopener noreferrer">
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
                    <input type="checkbox" id="available" name="available" checked={formulario?.available || false} onChange={handleChange} />

                    <input type="submit" value="Guardar" />
                    </div>
                </form>
            </div>
        </>
    )
}
