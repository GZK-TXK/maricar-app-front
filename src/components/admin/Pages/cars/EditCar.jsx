import React from 'react'
import { useParams } from 'react-router'
import { EditCarForm } from '../../components/car/EditCarForm'


export const EditCar = () => {
    const { id } = useParams()

    return (
        <main className="main-content">
        <div>EditCar - ID: {id}</div>
        <EditCarForm id= {id}/>
        </main>        
    )
}