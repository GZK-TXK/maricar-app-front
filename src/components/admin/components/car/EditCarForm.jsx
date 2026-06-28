import React, { useEffect, useRef, useState } from 'react'
import { useForm } from '../../hooks/useForm';
import { useFetch } from '../../hooks/useFetch'
import { useNavigate } from 'react-router';
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'

export const EditCarForm = ({id}) => {
const {formulario, handleSubmit, handleChange, setFormulario, enviado} = useForm({})
const {getData, isLoading, error, data}=useFetch()
const formRef = useRef(null)
const calendarRef = useRef(null)
const [unavailableDates, setUnavailableDates] = useState([])
    const getCar = async ()=>{
        const url= import.meta.env.VITE_API_URLBASE;
        await getData(`${url}/cars/${id}`)
    }
const navigate= useNavigate()
    useEffect(() => {
      getCar(id)
    }, [])
    useEffect(() => {
    if (data?.data) {
        setFormulario(data.data)
        setUnavailableDates(data.data.unavailableDates || [])
    }
}, [data])

    useEffect(() => {
        if (!calendarRef.current) return
        const fp = flatpickr(calendarRef.current, {
            mode: "range",
            minDate: "today",
            dateFormat: "Y-m-d",
        })
        return () => fp.destroy()
    }, [])

    const addDateRange = () => {
        const val = calendarRef.current?.value
        if (!val) return
        const [start, end] = val.split(" to ")
        if (!start || !end) {
            const d = new Date(start || val)
            setUnavailableDates(prev => [...prev, { start: val, end: val }])
        } else {
            setUnavailableDates(prev => [...prev, { start, end }])
        }
        calendarRef.current._flatpickr.clear()
    }

    const removeDateRange = (index) => {
        setUnavailableDates(prev => prev.filter((_, i) => i !== index))
    }

    const llamadaApi = async () => {
        const apiUrlBase = import.meta.env.VITE_API_URLBASE
        const formData = new FormData(formRef.current);
        formData.append("unavailableDates", JSON.stringify(unavailableDates))
        const token = localStorage.getItem("token");
        const options = {
            method: "PUT",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        await getData(`${apiUrlBase}/cars/${id}`, options)
    }
    const handleFormSubmit= (ev)=>{
        ev.preventDefault()
        llamadaApi()
        navigate('/admin/cars')
    }
        return (
        <>
        {isLoading && <p>Cargando coche.</p>}
            <div>
                <form
                    ref={formRef}
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

                    <label htmlFor="image">Imagen:</label>
                    <input type="file" id="image" name="image" accept="image/*" />

                    <label htmlFor="available">Disponibilidad:</label>
                    <input type="checkbox" id="available" name="available" value="true" checked={formulario?.available || false} onChange={handleChange} />

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
            </div>
        </>
    )
}
